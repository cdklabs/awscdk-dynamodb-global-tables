# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### GlobalTable <a name="GlobalTable" id="awscdk-dynamodb-global-tables.GlobalTable"></a>

- *Implements:* <a href="#awscdk-dynamodb-global-tables.IGlobalTable">IGlobalTable</a>

#### Initializers <a name="Initializers" id="awscdk-dynamodb-global-tables.GlobalTable.Initializer"></a>

```typescript
import { GlobalTable } from 'awscdk-dynamodb-global-tables'

new GlobalTable(scope: Construct, id: string, props: GlobalTableProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.Initializer.parameter.props">props</a></code> | <code><a href="#awscdk-dynamodb-global-tables.GlobalTableProps">GlobalTableProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="awscdk-dynamodb-global-tables.GlobalTable.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="awscdk-dynamodb-global-tables.GlobalTable.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="awscdk-dynamodb-global-tables.GlobalTable.Initializer.parameter.props"></a>

- *Type:* <a href="#awscdk-dynamodb-global-tables.GlobalTableProps">GlobalTableProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.grant">grant</a></code> | *No description.* |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.grantReadData">grantReadData</a></code> | *No description.* |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.grantReadWriteData">grantReadWriteData</a></code> | *No description.* |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.grantWriteData">grantWriteData</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="awscdk-dynamodb-global-tables.GlobalTable.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="awscdk-dynamodb-global-tables.GlobalTable.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="awscdk-dynamodb-global-tables.GlobalTable.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `grant` <a name="grant" id="awscdk-dynamodb-global-tables.GlobalTable.grant"></a>

```typescript
public grant(grantee: IGrantable, actions: string): Grant
```

###### `grantee`<sup>Required</sup> <a name="grantee" id="awscdk-dynamodb-global-tables.GlobalTable.grant.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

###### `actions`<sup>Required</sup> <a name="actions" id="awscdk-dynamodb-global-tables.GlobalTable.grant.parameter.actions"></a>

- *Type:* string

---

##### `grantReadData` <a name="grantReadData" id="awscdk-dynamodb-global-tables.GlobalTable.grantReadData"></a>

```typescript
public grantReadData(identity: IGrantable): Grant
```

###### `identity`<sup>Required</sup> <a name="identity" id="awscdk-dynamodb-global-tables.GlobalTable.grantReadData.parameter.identity"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `grantReadWriteData` <a name="grantReadWriteData" id="awscdk-dynamodb-global-tables.GlobalTable.grantReadWriteData"></a>

```typescript
public grantReadWriteData(grantee: IGrantable): Grant
```

###### `grantee`<sup>Required</sup> <a name="grantee" id="awscdk-dynamodb-global-tables.GlobalTable.grantReadWriteData.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `grantWriteData` <a name="grantWriteData" id="awscdk-dynamodb-global-tables.GlobalTable.grantWriteData"></a>

```typescript
public grantWriteData(grantee: IGrantable): Grant
```

###### `grantee`<sup>Required</sup> <a name="grantee" id="awscdk-dynamodb-global-tables.GlobalTable.grantWriteData.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.isResource">isResource</a></code> | Check whether the given construct is a Resource. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="awscdk-dynamodb-global-tables.GlobalTable.isConstruct"></a>

```typescript
import { GlobalTable } from 'awscdk-dynamodb-global-tables'

GlobalTable.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="awscdk-dynamodb-global-tables.GlobalTable.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="awscdk-dynamodb-global-tables.GlobalTable.isOwnedResource"></a>

```typescript
import { GlobalTable } from 'awscdk-dynamodb-global-tables'

GlobalTable.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="awscdk-dynamodb-global-tables.GlobalTable.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="awscdk-dynamodb-global-tables.GlobalTable.isResource"></a>

```typescript
import { GlobalTable } from 'awscdk-dynamodb-global-tables'

GlobalTable.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="awscdk-dynamodb-global-tables.GlobalTable.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.property.tableArn">tableArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTable.property.tableName">tableName</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="awscdk-dynamodb-global-tables.GlobalTable.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="awscdk-dynamodb-global-tables.GlobalTable.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="awscdk-dynamodb-global-tables.GlobalTable.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `tableArn`<sup>Required</sup> <a name="tableArn" id="awscdk-dynamodb-global-tables.GlobalTable.property.tableArn"></a>

```typescript
public readonly tableArn: string;
```

- *Type:* string

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="awscdk-dynamodb-global-tables.GlobalTable.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### GlobalTableProps <a name="GlobalTableProps" id="awscdk-dynamodb-global-tables.GlobalTableProps"></a>

#### Initializer <a name="Initializer" id="awscdk-dynamodb-global-tables.GlobalTableProps.Initializer"></a>

```typescript
import { GlobalTableProps } from 'awscdk-dynamodb-global-tables'

const globalTableProps: GlobalTableProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTableProps.property.partitionKey">partitionKey</a></code> | <code>aws-cdk-lib.aws_dynamodb.Attribute</code> | *No description.* |
| <code><a href="#awscdk-dynamodb-global-tables.GlobalTableProps.property.tableName">tableName</a></code> | <code>string</code> | *No description.* |

---

##### `partitionKey`<sup>Required</sup> <a name="partitionKey" id="awscdk-dynamodb-global-tables.GlobalTableProps.property.partitionKey"></a>

```typescript
public readonly partitionKey: Attribute;
```

- *Type:* aws-cdk-lib.aws_dynamodb.Attribute

---

##### `tableName`<sup>Optional</sup> <a name="tableName" id="awscdk-dynamodb-global-tables.GlobalTableProps.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IGlobalTable <a name="IGlobalTable" id="awscdk-dynamodb-global-tables.IGlobalTable"></a>

- *Extends:* aws-cdk-lib.IResource

- *Implemented By:* <a href="#awscdk-dynamodb-global-tables.GlobalTable">GlobalTable</a>, <a href="#awscdk-dynamodb-global-tables.IGlobalTable">IGlobalTable</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#awscdk-dynamodb-global-tables.IGlobalTable.grant">grant</a></code> | *No description.* |
| <code><a href="#awscdk-dynamodb-global-tables.IGlobalTable.grantReadData">grantReadData</a></code> | *No description.* |
| <code><a href="#awscdk-dynamodb-global-tables.IGlobalTable.grantReadWriteData">grantReadWriteData</a></code> | *No description.* |
| <code><a href="#awscdk-dynamodb-global-tables.IGlobalTable.grantWriteData">grantWriteData</a></code> | *No description.* |

---

##### `grant` <a name="grant" id="awscdk-dynamodb-global-tables.IGlobalTable.grant"></a>

```typescript
public grant(grantee: IGrantable, actions: string): Grant
```

###### `grantee`<sup>Required</sup> <a name="grantee" id="awscdk-dynamodb-global-tables.IGlobalTable.grant.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

###### `actions`<sup>Required</sup> <a name="actions" id="awscdk-dynamodb-global-tables.IGlobalTable.grant.parameter.actions"></a>

- *Type:* string

---

##### `grantReadData` <a name="grantReadData" id="awscdk-dynamodb-global-tables.IGlobalTable.grantReadData"></a>

```typescript
public grantReadData(grantee: IGrantable): Grant
```

###### `grantee`<sup>Required</sup> <a name="grantee" id="awscdk-dynamodb-global-tables.IGlobalTable.grantReadData.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `grantReadWriteData` <a name="grantReadWriteData" id="awscdk-dynamodb-global-tables.IGlobalTable.grantReadWriteData"></a>

```typescript
public grantReadWriteData(grantee: IGrantable): Grant
```

###### `grantee`<sup>Required</sup> <a name="grantee" id="awscdk-dynamodb-global-tables.IGlobalTable.grantReadWriteData.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `grantWriteData` <a name="grantWriteData" id="awscdk-dynamodb-global-tables.IGlobalTable.grantWriteData"></a>

```typescript
public grantWriteData(grantee: IGrantable): Grant
```

###### `grantee`<sup>Required</sup> <a name="grantee" id="awscdk-dynamodb-global-tables.IGlobalTable.grantWriteData.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#awscdk-dynamodb-global-tables.IGlobalTable.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#awscdk-dynamodb-global-tables.IGlobalTable.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#awscdk-dynamodb-global-tables.IGlobalTable.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |

---

##### `node`<sup>Required</sup> <a name="node" id="awscdk-dynamodb-global-tables.IGlobalTable.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="awscdk-dynamodb-global-tables.IGlobalTable.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="awscdk-dynamodb-global-tables.IGlobalTable.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

