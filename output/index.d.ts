/// <reference types="node" />
import { Compilation, Compiler } from 'webpack';
/** 任意类型转义 */
export declare function toCtx<T = any>(ctx: any): T;
/** resolve.alias types */
export interface Alias {
    [index: string]: string | false | string[];
}
/** Module.Assets types */
export interface ModuleAssets {
    [index: string]: string;
}
/** yyl webpack plugin 基础类 - 配置 */
export interface YylWebpackPluginBaseOption {
    context?: string;
    name?: string;
    filename?: string;
}
export interface UpdateAssetsOption {
    /** 原先输出路径 */
    oriDist?: string;
    /** assets 信息 */
    assetsInfo: AssetsInfo;
    compilation: Compilation;
}
/** 更新 assets 参数 */
export interface AssetsInfo {
    /** 文件源 */
    src?: string;
    /** 输出目录 */
    dist: string;
    /** 内容 */
    source: Buffer;
}
/** 添加监听-属性 */
export interface AddDependenciesOption {
    compilation: Compilation;
    srcs: string[];
}
/** yyl webpack plugin 基础类 - 属性 */
export declare type YylWebpackPluginBaseProperty = Required<YylWebpackPluginBaseOption>;
export interface YylWebpackPluginBaseInitCompilationOption {
    compiler: Compiler;
    onProcessAssets?: (compilation: Compilation) => Promise<void>;
}
/** yyl webpack plugin 基础类 */
export declare class YylWebpackPluginBase {
    /** 相对路径 */
    context: YylWebpackPluginBaseProperty['context'];
    /** 组件名称 */
    name: YylWebpackPluginBaseProperty['name'];
    /** 输出文件格式 */
    filename: YylWebpackPluginBaseProperty['filename'];
    /** assetsMap */
    assetMap: ModuleAssets;
    constructor(option?: YylWebpackPluginBaseOption);
    /** 获取文件类型 */
    getFileType(str: string): string;
    /** 获取文件名称 */
    getFileName(name: string, cnt: Buffer, fname?: string): string;
    /** 初始化 compilation */
    initCompilation(op: YylWebpackPluginBaseInitCompilationOption): void;
    /** 插件运行 */
    apply(compiler: Compiler): Promise<void>;
    /** 更新 assets */
    updateAssets(op: UpdateAssetsOption): void;
    /** 添加监听文件 */
    addDependencies(op: AddDependenciesOption): void;
}
