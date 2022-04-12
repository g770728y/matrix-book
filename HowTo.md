# 以某个点p为中心进行缩放 
要缩放的矩阵: _transformMatrix
定点: center

```typescript
    const factor = e.deltaY > 0 ? 1 / 1.05 : 1.05;
    this.renderer.transformMatrix = _transformMatrix.clone().append(Matrix.IDENTITY
      .translate(-center.x, -center.y)
      .scale(factor, factor)
      .translate(center.x, center.y))
```