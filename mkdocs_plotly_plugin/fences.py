from pymdownx.superfences import _escape
from pymdownx.superfences import SuperFencesException
from mkdocs.exceptions import PluginError
import json

def fence_plotly(source, language, class_name, options, md, **kwargs):
    try:
        data = json.loads(source)
    except Exception:
        raise SuperFencesException from PluginError(f"Your plotly syntax is not valid JSON. Fix:\n\n{source}")
    if data.get('file_path'):
        file_path = str(data['file_path'])
        return f'<div class="plotly-chart" data-jsonpath={file_path}></div>'
    return f'<div class="plotly-chart">{_escape(source)}</div>'
