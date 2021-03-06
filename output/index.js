/*!
 * yyl-webpack-plugin-base cjs 0.2.2
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

/** ?????????????????? */
function toCtx(ctx) {
    return ctx;
}
/** yyl webpack plugin ????????? */
class YylWebpackPluginBase {
    constructor(option) {
        /** ???????????? */
        this.context = process.cwd();
        /** ???????????? */
        this.name = 'yylBase';
        /** ?????????????????? */
        this.filename = '[name]-[hash:8].[ext]';
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
    /** ?????????????????? */
    getFileType(str) {
        const iStr = str.replace(/\?.*/, '');
        const split = iStr.split('.');
        let ext = split[split.length - 1];
        if (ext === 'map' && split.length > 2) {
            ext = `${split[split.length - 2]}.${split[split.length - 1]}`;
        }
        return ext;
    }
    /** ?????????????????? */
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
    /** ????????? compilation */
    initCompilation(op) {
        const { compiler, onProcessAssets } = op;
        const { name } = this;
        const assetMap = {};
        compiler.hooks.thisCompilation.tap(name, (compilation) => {
            compilation.hooks.processAssets.tapAsync(name, (assets, done) => __awaiter(this, void 0, void 0, function* () {
                const stats = compilation.getStats().toJson({
                    all: false,
                    assets: true,
                    modules: true,
                    cachedAssets: true,
                    ids: true,
                    publicPath: true
                });
                if (stats.assets) {
                    stats.assets.forEach((asset) => {
                        const extname = path__default['default'].extname(asset.name);
                        const dirname = path__default['default'].dirname(asset.name);
                        const oriFilename = asset.chunkNames[0];
                        let oriDist = '';
                        if (extname === '.map') {
                            return;
                        }
                        else if (asset.info.sourceFilename) {
                            oriDist = util__default['default'].path.join(dirname, path__default['default'].basename(asset.info.sourceFilename));
                        }
                        else if (oriFilename && extname !== '.map') {
                            oriDist = util__default['default'].path.join(dirname, `${oriFilename}${extname}`);
                        }
                        if (oriDist) {
                            assetMap[oriDist] = asset.name;
                        }
                    });
                }
                this.assetMap = assetMap;
                if (onProcessAssets) {
                    yield onProcessAssets(compilation);
                }
                done();
            }));
        });
    }
    /** ???????????? */
    apply(compiler) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = this;
            this.initCompilation({
                compiler,
                onProcessAssets: (compilation) => __awaiter(this, void 0, void 0, function* () {
                    const logger = compilation.getLogger(name);
                    logger.group(name);
                    Object.keys(this.assetMap).forEach((key) => {
                        logger.info(`${key} -> ${this.assetMap[key]}`);
                    });
                    logger.groupEnd();
                })
            });
        });
    }
    /** ?????? assets */
    updateAssets(op) {
        const { compilation, assetsInfo, oriDist } = op;
        if (compilation.assets[assetsInfo.dist]) {
            compilation.updateAsset(assetsInfo.dist, new webpack.sources.RawSource(assetsInfo.source, false), {
                sourceFilename: assetsInfo.src || assetsInfo.dist
            });
        }
        else {
            compilation.emitAsset(assetsInfo.dist, new webpack.sources.RawSource(assetsInfo.source, false), {
                sourceFilename: assetsInfo.src || assetsInfo.dist
            });
        }
        if (oriDist !== assetsInfo.dist && oriDist) {
            compilation.deleteAsset(oriDist);
        }
    }
    /** ?????????????????? */
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
