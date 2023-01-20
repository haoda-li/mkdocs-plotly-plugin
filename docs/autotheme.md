# Automatic Dark Theme

`mkdocs-plotly-plugin` supports [mkdocs-material](https://squidfunk.github.io/mkdocs-material/) dark color theme features. The feature is achieved by automatically re-layout all plotly charts using different themes. 

There are a list of pre-defined themes borrowed from [Plotly Python templates](https://plotly.com/python/templates/). By default, `mkdocs-plotly-plugin` uses a modified version of `plotly` and `plotly-dark`, which will only change font colors and grid colors. 

!!!note "Create your Own Theme"

    You can create your own theme in Plotly following [Plotly Python templates tutorial](https://plotly.com/python/templates/). Then, exports the template as a JSON

    ```python
    import plotly.io as pio
    plotly_template = pio.templates["plotly"]
    with open("template.json", "w") as f:
        f.write(plotly_template.layout.to_json())
    ```

    Then, put the JSON file under your `docs` dir, and change the `template_default` or `template_slate` to the relative path to the JSON file.  

## Disable Automatic Theme

You can disable automatic theme by setting `enable_template` to `False`. 

For individual plotly chart, first adding `attr_list` extension in your mkdocs config file 

```md title="mkdocs.yml"
markdown_extensions:
  - attr_list
```

Then, use a slightly different syntax based on the Attribute Lists extension

````
```{.plotly .no-auto-theme}
{
    "data": [
        {
            "x": [
                "giraffes",
                "orangutans",
                "monkeys"
            ],
            "y": [
                20,
                14,
                23
            ],
            "type": "bar"
        }
    ]
}
```
````

```{.plotly .no-auto-theme}
{
    "data": [
        {
            "x": [
                "giraffes",
                "orangutans",
                "monkeys"
            ],
            "y": [
                20,
                14,
                23
            ],
            "type": "bar"
        }
    ]
}
```


## Custom Theme for individual charts

You can overwrite the automatic theme by providing dark template and default template in the JSON. 

````
```plotly
{
    "slateTemplate": {
        "font": {"color": "white"},
        "paper_bgcolor": "rgba(0,0,0,0)",
        "plot_bgcolor": "rgb(50,0,0)"
    },
    "defaultTemplate": {
        "font": {"color": "black"},
        "paper_bgcolor": "rgba(0,0,0,0)",
        "plot_bgcolor": "rgb(255,50,255)"
    },
    "data": [
        {
            "x": ["giraffes", "orangutans", "monkeys"],
            "y": [20, 14, 23],
            "type": "bar"
        }
    ]
}
```
````

```plotly
{
    "slateTemplate": {
        "font": {"color": "white"},
        "paper_bgcolor": "rgba(0,0,0,0)",
        "plot_bgcolor": "rgb(50,0,0)"
    },
    "defaultTemplate": {
        "font": {"color": "black"},
        "paper_bgcolor": "rgba(0,0,0,0)",
        "plot_bgcolor": "rgb(255,50,255)"
    },
    "data": [
        {
            "x": ["giraffes", "orangutans", "monkeys"],
            "y": [20, 14, 23],
            "type": "bar"
        }
    ]
}
```