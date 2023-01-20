from pymdownx.superfences import _escape
from pymdownx.superfences import fence_code_format


import json

def fence_plotly(source, language, class_name, options, md, **kwargs):
    try:
        data = json.loads(source)
    except Exception:
        return fence_code_format(source, language, class_name, options, md, **kwargs)
    classes = [class_name] + kwargs['classes']
    classes_str = " ".join(classes)
    if data.get('file_path'):
        file_path = str(data['file_path'])
        return f'<div class="{classes_str}" data-jsonpath={file_path}></div>'
    return f'<div class="{classes_str}">{_escape(source)}</div>'
