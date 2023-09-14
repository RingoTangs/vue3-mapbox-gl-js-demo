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

