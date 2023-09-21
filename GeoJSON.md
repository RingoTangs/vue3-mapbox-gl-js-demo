# Links

[GeoJSON](https://geojson.org/)

[RFC 7946 - The GeoJSON Format (ietf.org)](https://datatracker.ietf.org/doc/html/rfc7946#autoid-5)



# 1. Introduction

GeoJSON 是一种使用 JavaScript 对象表示法 (JSON) 编码各种地理数据结构的格式。

GeoJSON 对象可以表示空间区域（a Geometry）、空间边界实体（a Feature）或特征列表（a FeatureCollection）。

## 1.1. Definitions

1. 术语 `"geometry type"`  指的是7种区分大小写的字符串：`"Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon", "GeometryCollection"`。
2. 作为另一种简写，术语 `"GeoJSON types"` 指的是 9 种区分大小写的字符串：`"Feature"、"Feature Collection"`，再加上上面的七种。

## 1.2. Example

A GeoJSON FeactureCollection：

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [102.0, 0.5]
      },
      "properties": {
        "prop0": "value0"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [102.0, 0.0],
          [103.0, 1.0],
          [104.0, 0.0],
          [105.0, 1.0]
        ]
      },
      "properties": {
        "prop0": "value0",
        "prop1": 0.0
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0]
          ]
        ]
      },
      "properties": {
        "prop0": "value0",
        "prop1": {
          "this": "that"
        }
      }
    }
  ]
}

```



# 2. GeoJSON Text

GeoJSON Text 是一个 JSON 文本，由单个 GeoJSON 对象组成。



# 3. GeoJSON Object

GeoJSON Object 表示 Geometry，Feature 或者 Feature Collection。

1. GeoJSON Object 是 JSON Object。
2. GeoJSON Object 有一个名为“type”的属性。 属性的值必须是 GeoJSON 类型之一。
3. GeoJSON 对象可以有一个“bbox”属性，其值必须是 bounding box array。
4. GeoJSON 对象可以有其他属性。



## 3.1. Geometry Object

Geometry Object表示坐标空间中的点（points）、曲线（curves）和曲面（surfaces）。每个 Geometry Object都是一个 GeoJSON Object，无论它出现在 GeoJSON 文本中的哪个位置。

1. Geometry Object 的“type”属性的值必须是以上七种 geometry types 之一。
2. 除“GeometryCollection”之外的任何类型的 GeoJSON Geometry Object都有一个名为“coordinates”的属性。"coordinates" 值是个数组。该数组种元素的结构由 geometry type 决定。GeoJSON 处理器可以将具有 empty  "coordinates" 数组的 Geometry Objects 解释为空对象。

### 3.1.1. Position

Position 是构造 geometry 的基础。Geometry Object 的 "Coordinates" 由以下任一组成：

1. 如果是Point geometry 就是 Position。
2. 如果是 LineString 或者 MultiPoint geometry 则是 Position 数组。
3. 如果是 Polygon 或者 MultiLineString geometry 则是 LineString 数组或者线性的坐标。
4. 如果是 MultiPolygon geometry 则是 Polygon coordinates 数组。

position 就是数字数组。必须有两个或者更多的元素。前两个元素代表经度和维度，完全按照该顺序并使用十进制数字。海拔高度或标高可以作为可选的第三个元素包含在内。

两个 position 之间的线是笛卡尔直线（ Cartesian line），是坐标参考系中这两点之间的最短线。

换句话说，两个不同的点 (lon0, lat0) 和 (lon1, lat1) 构成的线段上每个点的坐标可以计算为：

```shell
// 0 <= t <= 1
F(lon, lat) = (lon0 + (lon1 - lon0) * t, lat0 + (lat1 - lat0) * t) 
```

### 3.1.2. Point

对于 "Point" 类型，"coordinates" 属性是单个 position。



### 3.1.3. MultiPoint

对于 "MultiPoint" 类型，"coordinates" 属性是 position 数组。



### 3.1.4. LineString

对于 "LineString" 类型，"coordinates" 属性是两个或者多个位置的数组。



### 3.1.5. MultiLineString

对于 "MultiLineString" 类型，"coordinates" 属性是LineString 左边数组的数组。



### 3.1.6. Polygon

要指定特定于Polygon的约束，引入线性环很有用。

1. 线性环是具有四个或者更多位置的闭合 LineString。
2. 第一个和最后一个值是等效的，并且他们必须包含相同值，他们的表示也应该是相同的。
3. 线性环是表面的边界或者表面中孔的边界。
4. 线性环必须遵循边界区域的右手定则，即外环是逆时针方向，孔是顺时针方向。

尽管线性环没有明确表示为 GeoJSON 的 geometry type，但是它引导了 Polygon 几何类型定义的规范表述，如下所示：

1. 对于 "Polygon" type，"coordinates" 属性必须是线性环坐标数组。
2. 对于具有多个环的 Polygon，第一个必须是外环，其他任何环必须是内环，外环界定表面，内环（如果存在）界定地面上的孔。



### 3.1.7. MultiPolygon

对于 "MultiPolygon" 类型，"coordinates" 属性是 Polygon coordinates 数组的数组。



### 3.1.8. GeometryCollection

"GeometryCollection" 类型的 GeoJSON 对象是 Geometry 对象。

GeometryCollection 有一个名为 "geometries" 的属性，"geometries" 的值是一个数组，该数组的每个元素都是 GeoJSON Geometry 对象。该数组有可能为空。

与上述其他的几种 "geometry" types 不同，GeometryCollection 可以是较小的 Geometry 对象的异构组合。例如，字母 "i" 的形状可以由一个点和一个 LineString 组成。