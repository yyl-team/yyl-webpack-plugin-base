[yyl-webpack-plugin-base](../README.md) / [Exports](../modules.md) / YylWebpackPluginBase

# Class: YylWebpackPluginBase

yyl webpack plugin 基础类

## Hierarchy

* **YylWebpackPluginBase**

## Table of contents

### Constructors

- [constructor](yylwebpackpluginbase.md#constructor)

### Properties

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

Defined in: index.ts:69

## Properties

### assetMap

• **assetMap**: [*ModuleAssets*](../interfaces/moduleassets.md)

assetsMap

Defined in: index.ts:69

___

### context

• **context**: *string*

相对路径

Defined in: index.ts:63

___

### filename

• **filename**: *string*= '[name]-[hash:8].[ext]'

输出文件格式

Defined in: index.ts:67

___

### name

• **name**: *string*= 'yylBase'

组件名称

Defined in: index.ts:65

## Methods

### addDependencies

▸ **addDependencies**(`op`: [*AddDependenciesOption*](../interfaces/adddependenciesoption.md)): *void*

添加监听文件

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*AddDependenciesOption*](../interfaces/adddependenciesoption.md) |

**Returns:** *void*

Defined in: index.ts:209

___

### apply

▸ **apply**(`compiler`: *Compiler*): *Promise*<*void*\>

插件运行

#### Parameters:

Name | Type |
------ | ------ |
`compiler` | *Compiler* |

**Returns:** *Promise*<*void*\>

Defined in: index.ts:176

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

Defined in: index.ts:98

___

### getFileType

▸ **getFileType**(`str`: *string*): *string*

获取文件类型

#### Parameters:

Name | Type |
------ | ------ |
`str` | *string* |

**Returns:** *string*

Defined in: index.ts:86

___

### initCompilation

▸ **initCompilation**(`op`: [*YylWebpackPluginBaseInitCompilationOption*](../interfaces/yylwebpackpluginbaseinitcompilationoption.md)): *void*

初始化 compilation

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*YylWebpackPluginBaseInitCompilationOption*](../interfaces/yylwebpackpluginbaseinitcompilationoption.md) |

**Returns:** *void*

Defined in: index.ts:128

___

### updateAssets

▸ **updateAssets**(`op`: [*UpdateAssetsOption*](../interfaces/updateassetsoption.md)): *void*

更新 assets

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*UpdateAssetsOption*](../interfaces/updateassetsoption.md) |

**Returns:** *void*

Defined in: index.ts:192
