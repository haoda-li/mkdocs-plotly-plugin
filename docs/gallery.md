# Gallery

You can create plots in any of the Plotly libraries and export the JSON file for inserting into your documentations. 

Using Python as an example


```bash
# Install the Plotly Python package
conda install -c plotly plotly=5.11.0
```


```python
import plotly.express as px
import plotly.graph_objects as go
```

## Scatter Plot


```python
df = px.data.iris()
fig = px.scatter(df, x="sepal_width", y="sepal_length", color="species",
                 size='petal_length', hover_data=['petal_width'])
with open("./docs/assets/scatter.json", "w") as f:
    f.write(fig.to_json())
```

```plotly
--8<-- "./assets/scatter.json"
```


## Contour Plot


```python
fig = go.Figure(data =
    go.Contour(
        z=[[10, 10.625, 12.5, 15.625, 20],
           [5.625, 6.25, 8.125, 11.25, 15.625],
           [2.5, 3.125, 5., 8.125, 12.5],
           [0.625, 1.25, 3.125, 6.25, 10.625],
           [0, 0.625, 2.5, 5.625, 10]],
        x=[-9, -6, -5 , -3, -1], # horizontal axis
        y=[0, 1, 4, 5, 7] # vertical axis
    ))
with open("./docs/assets/contour.json", "w") as f:
    f.write(fig.to_json())
```

```plotly
--8<-- "./assets/contour.json"
```

## 3D Scatter Plot


```python
df = px.data.iris()
fig = px.scatter_3d(df, x='sepal_length', y='sepal_width', z='petal_width',
              color='species')
with open("./docs/assets/scatter3d.json", "w") as f:
    f.write(fig.to_json())
```

```plotly
{"file_path": "/assets/scatter3d.json"}
```
