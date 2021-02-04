[yyl-webpack-plugin-base](../README.md) / [Exports](../modules.md) / YylWebpackPluginBase

# Class: YylWebpackPluginBase

yyl webpack plugin 基础类

## Hierarchy

* **YylWebpackPluginBase**

## Table of contents

### Constructors

- [constructor](yylwebpackpluginbase.md#constructor)

### Properties

- [alias](yylwebpackpluginbase.md#alias)
- [assetMap](yylwebpackpluginbase.md#assetmap)
- [context](yylwebpackpluginbase.md#context)
- [filename](yylwebpackpluginbase.md#filename)
- [name](yylwebpackpluginbase.md#name)

### Methods

- [apply](yylwebpackpluginbase.md#apply)
- [getFileName](yylwebpackpluginbase.md#getfilename)
- [getFileType](yylwebpackpluginbase.md#getfiletype)
- [initCompilation](yylwebpackpluginbase.md#initcompilation)
- [updateAssets](yylwebpackpluginbase.md#updateassets)

## Constructors

### constructor

\+ **new YylWebpackPluginBase**(`option?`: [*YylWebpackPluginBaseOption*](../interfaces/yylwebpackpluginbaseoption.md)): [*YylWebpackPluginBase*](yylwebpackpluginbase.md)

#### Parameters:

Name | Type |
------ | ------ |
`option?` | [*YylWebpackPluginBaseOption*](../interfaces/yylwebpackpluginbaseoption.md) |

**Returns:** [*YylWebpackPluginBase*](yylwebpackpluginbase.md)

Defined in: [index.ts:65](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/3192340/src/index.ts#L65)

## Properties

### alias

• **alias**: [*Alias*](../interfaces/alias.md)

resolve.alias 绝对路径

Defined in: [index.ts:63](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/3192340/src/index.ts#L63)

___

### assetMap

• **assetMap**: [*ModuleAssets*](../interfaces/moduleassets.md)

assetsMap

Defined in: [index.ts:65](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/3192340/src/index.ts#L65)

___

### context

• **context**: *string*

相对路径

Defined in: [index.ts:57](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/3192340/src/index.ts#L57)

___

### filename

• **filename**: *string*= '[name]-[hash:8].[ext]'

输出文件格式

Defined in: [index.ts:61](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/3192340/src/index.ts#L61)

___

### name

• **name**: *string*= 'yylBase'

组件名称

Defined in: [index.ts:59](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/3192340/src/index.ts#L59)

## Methods

### apply

▸ **apply**(`compiler`: *Compiler*): *Promise*<*void*\>

插件运行

#### Parameters:

Name | Type |
------ | ------ |
`compiler` | *Compiler* |

**Returns:** *Promise*<*void*\>

Defined in: [index.ts:203](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/3192340/src/index.ts#L203)

___

### getFileName

▸ **getFileName**(`name`: *string*, `cnt`: *Buffer*, `fname?`: *string*): *string*

获取文件名称

#### Parameters:

Name | Type |
------ | ------ |
`name` | *string* |
`cnt` | *Buffer* |
`fname?` | *string* |

**Returns:** *string*

Defined in: [index.ts:94](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/3192340/src/index.ts#L94)

___

### getFileType

▸ **getFileType**(`str`: *string*): *string*

获取文件类型

#### Parameters:

Name | Type |
------ | ------ |
`str` | *string* |

**Returns:** *string*

Defined in: [index.ts:82](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/3192340/src/index.ts#L82)

___

### initCompilation

▸ **initCompilation**(`compiler`: *Compiler*): *Promise*<[*InitEmitHooksResult*](../interfaces/initemithooksresult.md)\>

初始化 compilation

#### Parameters:

Name | Type |
------ | ------ |
`compiler` | *Compiler* |

**Returns:** *Promise*<[*InitEmitHooksResult*](../interfaces/initemithooksresult.md)\>

Defined in: [index.ts:124](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/3192340/src/index.ts#L124)

___

### updateAssets

▸ **updateAssets**(`op`: [*UpdateAssetsOption*](../interfaces/updateassetsoption.md)): *void*

更新 assets

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*UpdateAssetsOption*](../interfaces/updateassetsoption.md) |

**Returns:** *void*

Defined in: [index.ts:216](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/3192340/src/index.ts#L216)
