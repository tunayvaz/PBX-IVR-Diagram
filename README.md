# PBX-IVR-Diagram
An IVR diagram for telecommunication companies created with GoJS allowing interactive changes such as adding, deleting or editing IVR's.

*Interactively addable with given port name and number and deletable IVR's as graph nodes.

*One can easily add new IVR relations as graph nodes and links between them.

*Every property that the relevant IVR has is editable via Data Inspector.

*All changes on the diagram will be applied at the PBX with a provided web service.

Note that this code needs 2 JSON files (jsonNodes, jsonTemplates) in a specific format to draw the diagram and an XLS or XLSX file (XLSXdata) to show the selected IVR's every data in the inspector when clicked the node. Source code can be easily edited by the user in order to work with other JSON formats.
