/*!
 * yyl-webpack-plugin-base cjs 0.1.5
 * (c) 2020 - 2021 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var fs = require('fs');
var util = require('yyl-util');
var crypto = require('crypto');
var webpack = require('webpack');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var util__default = /*#__PURE__*/_interopDefaultLegacy(util);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/** 任意类型转义 */
function toCtx(ctx) {
    return ctx;
}
/** yyl webpack plugin 基础类 */
class YylWebpackPluginBase {
    constructor(option) {
        /** 相对路径 */
        this.context = process.cwd();
        /** 组件名称 */
        this.name = 'yylBase';
        /** 输出文件格式 */
        this.filename = '[name]-[hash:8].[ext]';
        /** resolve.alias 绝对路径 */
        this.alias = {};
        /** assetsMap */
        this.assetMap = {};
        if (option === null || option === void 0 ? void 0 : option.context) {
            this.context = option.context;
        }
        if (option === null || option === void 0 ? void 0 : option.name) {
            this.name = option.name;
        }
        if (option === null || option === void 0 ? void 0 : option.filename) {
            this.filename = option.filename;
        }
    }
    /** 获取文件类型 */
    getFileType(str) {
        const iStr = str.replace(/\?.*/, '');
        const split = iStr.split('.');
        let ext = split[split.length - 1];
        if (ext === 'map' && split.length > 2) {
            ext = `${split[split.length - 2]}.${split[split.length - 1]}`;
        }
        return ext;
    }
    /** 获取文件名称 */
    getFileName(name, cnt, fname) {
        let { filename } = this;
        if (fname) {
            filename = fname;
        }
        const REG_HASH = /\[hash:(\d+)\]/g;
        const REG_NAME = /\[name\]/g;
        const REG_EXT = /\[ext\]/g;
        const dirname = path__default['default'].dirname(name);
        const basename = path__default['default'].basename(name);
        const ext = path__default['default'].extname(basename).replace(/^\./, '');
        const iName = basename.slice(0, basename.length - (ext.length > 0 ? ext.length + 1 : 0));
        let hash = '';
        if (filename.match(REG_HASH)) {
            let hashLen = 0;
            filename.replace(REG_HASH, (str, $1) => {
                hashLen = +$1;
                hash = crypto.createHash('md5').update(cnt.toString()).digest('hex').slice(0, hashLen);
                return str;
            });
        }
        const r = filename.replace(REG_HASH, hash).replace(REG_NAME, iName).replace(REG_EXT, ext);
        return util__default['default'].path.join(dirname, r);
    }
    /** 初始化 compilation */
    initCompilation(compiler) {
        const { context, resolve } = compiler.options;
        const { name } = this;
        const alias = {};
        if (resolve.alias) {
            Object.keys(resolve.alias).forEach((key) => {
                let iPath = toCtx(resolve.alias)[key];
                if (iPath) {
                    iPath = path__default['default'].resolve(this.context, iPath);
                }
                if (context) {
                    iPath = path__default['default'].resolve(context, iPath);
                }
                alias[key] = iPath;
            });
        }
        return new Promise((resolve) => {
            // + map init
            const moduleAssets = {};
            compiler.hooks.compilation.tap(name, (compilation) => {
                compilation.hooks.moduleAsset.tap(name, (module, file) => {
                    if (module.userAssets) {
                        moduleAssets[file] = path__default['default'].join(path__default['default'].dirname(file), path__default['default'].basename(module.userRequest));
                    }
                });
            });
            compiler.hooks.emit.tapAsync(name, (compilation, done) => __awaiter(this, void 0, void 0, function* () {
                // + init assetMap
                const assetMap = {};
                compilation.chunks.forEach((chunk) => {
                    chunk.files.forEach((fName) => {
                        if (/hot-update/.test(fName)) {
                            return;
                        }
                        if (chunk.name) {
                            const key = `${util__default['default'].path.join(path__default['default'].dirname(fName), chunk.name)}.${this.getFileType(fName)}`;
                            assetMap[key] = fName;
                        }
                        else {
                            assetMap[fName] = fName;
                        }
                    });
                });
                const stats = compilation.getStats().toJson({
                    all: false,
                    assets: true,
                    cachedAssets: true
                });
                stats.assets.forEach((asset) => {
                    const name = moduleAssets[asset.name];
                    if (name) {
                        assetMap[name] = asset.name;
                    }
                    else if (asset.info.sourceFilename) {
                        assetMap[util__default['default'].path.join(path__default['default'].dirname(asset.name), path__default['default'].basename(asset.info.sourceFilename))] = asset.name;
                    }
                });
                // - init assetMap
                this.assetMap = assetMap;
                this.alias = alias;
                resolve({
                    compilation,
                    done
                });
            }));
            // - map init
        });
    }
    /** 插件运行 */
    apply(compiler) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = this;
            const { compilation, done } = yield this.initCompilation(compiler);
            const logger = compilation.getLogger(name);
            logger.group(name);
            Object.keys(this.assetMap).forEach((key) => {
                logger.info(`${key} -> ${this.assetMap[key]}`);
            });
            logger.groupEnd();
            done();
        });
    }
    /** 更新 assets */
    updateAssets(op) {
        const { compilation, assetsInfo, oriDist } = op;
        compilation.emitAsset(assetsInfo.dist, new webpack.sources.RawSource(assetsInfo.source, false), {
            sourceFilename: assetsInfo.src || assetsInfo.dist
        });
        if (oriDist !== assetsInfo.dist && oriDist) {
            compilation.deleteAsset(oriDist);
        }
    }
    /** 添加监听文件 */
    addDependencies(op) {
        const { srcs, compilation } = op;
        srcs.forEach((src) => {
            if (fs__default['default'].existsSync(src)) {
                compilation.fileDependencies.add(src);
            }
        });
    }
}

exports.YylWebpackPluginBase = YylWebpackPluginBase;
exports.toCtx = toCtx;
