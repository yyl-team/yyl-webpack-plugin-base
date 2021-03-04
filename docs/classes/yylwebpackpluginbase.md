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

- [addDependencies](yylwebpackpluginbase.md#adddependencies)
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

Defined in: [index.ts:72](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/f86be42/src/index.ts#L72)

## Properties

### alias

• **alias**: [*Alias*](../interfaces/alias.md)

resolve.alias 绝对路径

Defined in: [index.ts:70](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/f86be42/src/index.ts#L70)

___

### assetMap

• **assetMap**: [*ModuleAssets*](../interfaces/moduleassets.md)

assetsMap

Defined in: [index.ts:72](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/f86be42/src/index.ts#L72)

___

### context

• **context**: *string*

相对路径

Defined in: [index.ts:64](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/f86be42/src/index.ts#L64)

___

### filename

• **filename**: *string*= '[name]-[hash:8].[ext]'

输出文件格式

Defined in: [index.ts:68](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/f86be42/src/index.ts#L68)

___

### name

• **name**: *string*= 'yylBase'

组件名称

Defined in: [index.ts:66](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/f86be42/src/index.ts#L66)

## Methods

### addDependencies

▸ **addDependencies**(`op`: [*AddDependenciesOption*](../interfaces/adddependenciesoption.md)): *void*

添加监听文件

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*AddDependenciesOption*](../interfaces/adddependenciesoption.md) |

**Returns:** *void*

Defined in: [index.ts:223](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/f86be42/src/index.ts#L223)

___

### apply

▸ **apply**(`compiler`: *Compiler*): *Promise*<*void*\>

插件运行

#### Parameters:

Name | Type |
------ | ------ |
`compiler` | *Compiler* |

**Returns:** *Promise*<*void*\>

Defined in: [index.ts:193](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/f86be42/src/index.ts#L193)

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

Defined in: [index.ts:101](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/f86be42/src/index.ts#L101)

___

### getFileType

▸ **getFileType**(`str`: *string*): *string*

获取文件类型

#### Parameters:

Name | Type |
------ | ------ |
`str` | *string* |

**Returns:** *string*

Defined in: [index.ts:89](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/f86be42/src/index.ts#L89)

___

### initCompilation

▸ **initCompilation**(`compiler`: *Compiler*): *Promise*<[*InitEmitHooksResult*](../interfaces/initemithooksresult.md)\>

初始化 compilation

#### Parameters:

Name | Type |
------ | ------ |
`compiler` | *Compiler* |

**Returns:** *Promise*<[*InitEmitHooksResult*](../interfaces/initemithooksresult.md)\>

Defined in: [index.ts:131](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/f86be42/src/index.ts#L131)

___

### updateAssets

▸ **updateAssets**(`op`: [*UpdateAssetsOption*](../interfaces/updateassetsoption.md)): *void*

更新 assets

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*UpdateAssetsOption*](../interfaces/updateassetsoption.md) |

**Returns:** *void*

Defined in: [index.ts:206](https://github.com/jackness1208/yyl-webpack-plugin-base/blob/f86be42/src/index.ts#L206)
