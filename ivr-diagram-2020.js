/* There is no spoon. */

async function drawDiagram() {
  var $ = go.GraphObject.make;

  ivrDiagram = $(go.Diagram, "ivrDiagramDiv", {
    initialContentAlignment: go.Spot.Center,
    initialAutoScale: go.Diagram.Uniform,
    layout: $(go.LayeredDigraphLayout, {
      direction: 0
    }),
    "undoManager.isEnabled": true,
    "commandHandler.deletesTree": false,
    "draggingTool.dragsTree": true,
  });

  var tempName = "JSONTEMPLATES.json";
  var nodeName = "JSONNODES.json";

  function fetchJson(fetchThis) {
    try {
      const response = fetch(fetchThis)
        .then(data => {
          const exam = data.json();
          return exam;
        })
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  
  const jsonTemplates = await fetchJson(tempName);
  const jsonNodes = await fetchJson(nodeName);
  ivrDiagram.model.linkToPortIdProperty = "topid";

  var url = "TABLEPBXIVR.xlsx";
  var XRH = new XMLHttpRequest();
  XRH.open("GET", url, true);
  XRH.responseType = "arraybuffer";
  XRH.onload = function (e) {
    var arraybuffer = XRH.response;
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");
    var workbook = XLSX.read(bstr, { type: "binary" });
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    var XLSXtoJson = XLSX.utils.sheet_to_json(worksheet)
    for (var i in jsonNodes.nodeDataArray) {
      for (var j in XLSXtoJson) {
        if (jsonNodes.nodeDataArray[i].key == XLSXtoJson[j].IVRID) {
          jsonNodes.nodeDataArray[i].IVRID = checkValue(XLSXtoJson[j].IVRID)
          jsonNodes.nodeDataArray[i].IVRTYPE = checkValue(XLSXtoJson[j].IVRTYPE)
          jsonNodes.nodeDataArray[i].IVRNAME = checkValue(XLSXtoJson[j].IVRNAME)
          jsonNodes.nodeDataArray[i].ANNOUNCEID = checkValue(XLSXtoJson[j].ANNOUNCEID)
          jsonNodes.nodeDataArray[i].TIMEOUT = checkValue(XLSXtoJson[j].TIMEOUT)
          jsonNodes.nodeDataArray[i].ERRORCOUNT = checkValue(XLSXtoJson[j].ERRORCOUNT)
          jsonNodes.nodeDataArray[i].INVALIDMSGID = checkValue(XLSXtoJson[j].INVALIDMSGID)
          jsonNodes.nodeDataArray[i].TOMSGID = checkValue(XLSXtoJson[j].TOMSGID)
          jsonNodes.nodeDataArray[i].LOOPTO = checkValue(XLSXtoJson[j].LOOPTO)
          jsonNodes.nodeDataArray[i].LOOPINV = checkValue(XLSXtoJson[j].LOOPINV)
          jsonNodes.nodeDataArray[i].DIALOPTION = checkValue(XLSXtoJson[j].DIALOPTION)
          jsonNodes.nodeDataArray[i].TODESTTYPE = checkValue(XLSXtoJson[j].TODESTTYPE)
          jsonNodes.nodeDataArray[i].TODESTPARAM = checkValue(XLSXtoJson[j].TODESTPARAM)
          jsonNodes.nodeDataArray[i].INVDESTTYPE = checkValue(XLSXtoJson[j].INVDESTTYPE)
          jsonNodes.nodeDataArray[i].INVDESTPARAM = checkValue(XLSXtoJson[j].INVDESTPARAM)
          jsonNodes.nodeDataArray[i].NOTES = checkValue(XLSXtoJson[j].NOTES)
          jsonNodes.nodeDataArray[i].MODUID = checkValue(XLSXtoJson[j].MODUID)
          jsonNodes.nodeDataArray[i].MODDATE = checkValue(XLSXtoJson[j].MODDATE)
          jsonNodes.nodeDataArray[i].CLASSNAME = checkValue(XLSXtoJson[j].CLASSNAME)
          jsonNodes.nodeDataArray[i].DISPLAYTOAGENT = checkValue(XLSXtoJson[j].DISPLAYTOAGENT)
          jsonNodes.nodeDataArray[i].CONTEXTID = checkValue(XLSXtoJson[j].CONTEXTID)
          jsonNodes.nodeDataArray[i].EXITANNOUNCE = checkValue(XLSXtoJson[j].EXITANNOUNCE)
          jsonNodes.nodeDataArray[i].LANGUAGE = checkValue(XLSXtoJson[j].LANGUAGE)
          jsonNodes.nodeDataArray[i].LOGVALID = checkValue(XLSXtoJson[j].LOGVALID)
          jsonNodes.nodeDataArray[i].LOGINVALID = checkValue(XLSXtoJson[j].LOGINVALID)
          jsonNodes.nodeDataArray[i].CHVAR = checkValue(XLSXtoJson[j].CHVAR)
          jsonNodes.nodeDataArray[i].TTSID = checkValue(XLSXtoJson[j].TTSID)
          jsonNodes.nodeDataArray[i].CONDITION_TEXT = checkValue(XLSXtoJson[j].CONDITION_TEXT)
          jsonNodes.nodeDataArray[i].CONDITION = checkValue(XLSXtoJson[j].CONDITION)
          jsonNodes.nodeDataArray[i].IVRGRPID = checkValue(XLSXtoJson[j].IVRGRPID)
          jsonNodes.nodeDataArray[i].HASHTYPE = checkValue(XLSXtoJson[j].HASHTYPE)
          jsonNodes.nodeDataArray[i].ANSWERCHANNEL = checkValue(XLSXtoJson[j].ANSWERCHANNEL)
          jsonNodes.nodeDataArray[i].INTDTIMEOUT = checkValue(XLSXtoJson[j].INTDTIMEOUT)
          jsonNodes.nodeDataArray[i].INTRRTTYPE = checkValue(XLSXtoJson[j].INTRRTTYPE)
          jsonNodes.nodeDataArray[i].INTRRTTIMEOUT = checkValue(XLSXtoJson[j].INTRRTTIMEOUT)
          jsonNodes.nodeDataArray[i].INTRRTDESTTYPE = checkValue(XLSXtoJson[j].INTRRTDESTTYPE)
          jsonNodes.nodeDataArray[i].INTRRPTDESTPARAM = checkValue(XLSXtoJson[j].INTRRPTDESTPARAM)
          jsonNodes.nodeDataArray[i].INTERRUPTIBLE = checkValue(XLSXtoJson[j].INTERRUPTIBLE)
        }
      }
    }
  }
  XRH.send();

  function checkValue(value) { // Set Inspector textbox to empty instead of undefined if there is no data to show
    if (value === undefined)
      return ""
    else
      return value
  }

  function PrepareTemplates() {
    for (var i in jsonTemplates) {
      // Prepare inputports. Usually there's only one input port.
      var inputPorts = [];
      for (var j in jsonTemplates[i].inputPorts) {
        //var iPortSize = jsonTemplates[i].inputPorts[j].portName.length
        var port = makePort(jsonTemplates[i].inputPorts[j].portName, jsonTemplates[i].inputPorts[j].acceptability, /*iPortSize*/);
        inputPorts.push(port);
      }
      // Prepare output ports
      var outputPorts = [];
      for (var j in jsonTemplates[i].outputPorts) {
        var oPortSize = jsonTemplates[i].outputPorts[j].portName.length // To assign port width based on port name length.
        var port = makePort(jsonTemplates[i].outputPorts[j].portName, jsonTemplates[i].outputPorts[j].acceptability, oPortSize);
        outputPorts.push(port);
      }
      var DTMFcnt = jsonTemplates[i].outputPorts.length // To assign node height based on number of output ports.
      makeTemplate(jsonTemplates[i].name, inputPorts, outputPorts, DTMFcnt);
    }
  }

  // IO port definiton
  function makePort(portName, leftside, portSize) {
    if (leftside) {
      var panel =
        $(go.Panel, "Auto", {
        },
          $(go.Shape, "Rectangle", {
            margin: new go.Margin(-0.5, 0),
            fill: "orange",
            stroke: "white",
            desiredSize: new go.Size(0, 0),
            portId: portName,
            toMaxLinks: 20,
            cursor: "pointer",
            toLinkable: true,
          }),
          $(go.TextBlock, portName, // The name of the port
            {
              font: "8pt sans-serif",
              stroke: "white",
              margin: new go.Margin(2, 2, 0, 2)
            },
            new go.Binding("text", "portName").makeTwoWay()
          )
        )
      panel.fromSpot = go.Spot.Left;
      panel.fromLinkable = true;
      panel.alignment = go.Spot.TopLeft;
    } else {
      var panel =
        $(go.Panel, "Auto", {
        },
          $(go.Shape, "Rectangle", {
            margin: new go.Margin(-0.5, 0),
            fill: "orange",
            stroke: "white",
            desiredSize: new go.Size(9 + portSize * (7), 18),
            portId: portName, // Declare this object to be a "port"
            toMaxLinks: 20, // Don't allow more than one link into a port
            cursor: "pointer", // Show a different cursor to indicate potential link point
            fromLinkable: true,
          }),
          $(go.TextBlock, portName, // The name of the port
            {
              font: "8pt sans-serif",
              stroke: "white",
              margin: new go.Margin(2, 2, 0, 2),
              editable: true,
            },
            new go.Binding("text", "portName").makeTwoWay()
          )
        )
      panel.fromSpot = go.Spot.Right;
      panel.fromLinkable = true;
      panel.alignment = go.Spot.TopRight;
    }
    return panel;
  }

  function makeTemplate(name, inports, outports, DTMFcount) {
    var node = $(go.Node, "Table", {
      isShadowed: true,
      contextMenu: nodeMenu,
      click: nodeClicked,
    },
      $(go.Panel, "Auto", {
        width: 220,
        height: 60 + (DTMFcount * 20)
      },
        $(go.Shape, "RoundedRectangle", {
          fill: "forestgreen",
          stroke: null,
          strokeWidth: 0,
        }),
        $(go.Panel, "Auto", {
          alignment: go.Spot.Left,
          margin: 10
        },
          $(go.TextBlock, name, { // Name of the node. Editible by clicking on it or via inspector.
            column: 0,
            row: 0,
            maxSize: new go.Size(90, NaN),
            stroke: "white",
            font: "bold 11pt sans-serif",
            editable: true,
            textAlign: "left"
          },
            new go.Binding("text", "type").makeTwoWay(),
            new go.Binding("text", "IVRNAME").makeTwoWay()
            ))
      ),
      $(go.Panel, "Vertical", {
        alignment: go.Spot.Left,
        alignmentFocus: go.Spot.Left
      },
        inports),
      $(go.Panel, "Vertical", {
        alignment: go.Spot.Right,
        alignmentFocus: go.Spot.Right
      },
        outports)
    );
    ivrDiagram.nodeTemplateMap.set(name, node);
  }

  ivrDiagram.linkTemplate =
    $(go.Link, {
      routing: go.Link.AvoidsNodes,
      corner: 5,
      relinkableTo: true,
      isLabeledLink: true
    },
      $(go.Shape, {
        stroke: "black",
        strokeWidth: 2
      }),
      $(go.Shape, {
        stroke: "black",
        toArrow: "Standard"
      }),
      $(go.TextBlock, new go.Binding("text", "text"))
    );

  ivrDiagram.addDiagramListener("ClipboardPasted",
    // When paste is done, changes only occur in the diagram.model (which is actually jsonNodes).
    // But the program needs both jsonNodes and jsonTemplates. So, mirror same changes to the jsonTemplates.
    function nodePasted() {
      var pastedNode = {
        id: jsonNodes.nodeDataArray[(jsonNodes.nodeDataArray.length) - 1].key,
        name: jsonNodes.nodeDataArray[(jsonNodes.nodeDataArray.length) - 1].type,
        inputPorts:
          [
            {
              portName: "0",
              acceptability: true
            }
          ],
        outputPorts: []
      }
      for (var i = 0; i < jsonTemplates.length; i++) {
        if (jsonTemplates[i].name === jsonNodes.nodeDataArray[(jsonNodes.nodeDataArray.length) - 1].type) {
          for (var j = 0; j < jsonTemplates[i].outputPorts.length; j++) {
            pastedNode.outputPorts.push(jsonTemplates[i].outputPorts[j]);
          }
          break;
        }
      }
      jsonTemplates.push(pastedNode)
    }
  );

  var refreshBtn = document.getElementById('refreshpanel')
  // In case names are not the same in the jsonTemplates and jsonNodes, node shape disappears.
  // To avoid this, set them as the same.
  refreshBtn.onclick = function () {
    refreshDiagram()
  }
  function refreshDiagram(){
    for (var i = 0; i < jsonTemplates.length; i++) {
      for (var j = 0; j < jsonNodes.nodeDataArray.length; j++) {
        if (jsonTemplates[i].id === jsonNodes.nodeDataArray[j].key) {
          jsonTemplates[i].name = jsonNodes.nodeDataArray[j].type;
          jsonNodes.nodeDataArray[j].IVRNAME=jsonNodes.nodeDataArray[j].type
        }
      }
    }
    redrawDiagram()
  }

  var getData = document.getElementById('saveData')
  getData.onclick = function () {
    var addedNode = document.getElementById('newNodeName').value
    var numberOfPorts = document.getElementById('numberOfPorts').value
    addNode(addedNode, numberOfPorts)
  }

  var keycnt = 1
  function addNode(newNodeName, numberOfPorts) {
    if (newNodeName == "" || numberOfPorts == "")
      alert("Invalid Node or Port Name");
    else {
      var i = keycnt
      if (keycnt == 1) {
        i = ""
      }
      var addToTemplates = {
        id: "random-generated-key-here" + i,
        name: newNodeName,
        inputPorts: [
          {
            portName: "0",
            acceptability: true
          }
        ],
        outputPorts: []
      }
      var addToNodes = {
        key: "random-generated-key-here",
        type: newNodeName
      }

      for (var i = 0; i < numberOfPorts; i++) {
        var addOutputs = // Should be added to diagram.model (jsonNodes) which contains the whole diagram data.
        {
          portName: "" + i,
          acceptability: false
        }
        addToTemplates.outputPorts.push(addOutputs)
      }
      jsonTemplates.push(addToTemplates)

      var newOutports = []
      var newInputPort = makePort(jsonTemplates[jsonTemplates.length - 1].inputPorts[0].portName, jsonTemplates[jsonTemplates.length - 1].inputPorts[0].acceptability, jsonTemplates[jsonTemplates.length - 1].inputPorts[0].portName.length)
      for (var i = 0; i < numberOfPorts; i++) {
        var newOutputPort = makePort(jsonTemplates[jsonTemplates.length - 1].outputPorts[i].portName, jsonTemplates[jsonTemplates.length - 1].outputPorts[i].acceptability, jsonTemplates[jsonTemplates.length - 1].outputPorts[i].portName.length)
        newOutports.push(newOutputPort)
      }
      makeTemplate(jsonTemplates[jsonTemplates.length - 1].name, newInputPort, newOutports, jsonTemplates[jsonTemplates.length - 1].outputPorts.length)
      jsonNodes.nodeDataArray.push(addToNodes)
      ivrDiagram.model = go.Model.fromJson(jsonNodes);
      keycnt++
    }
  }

  var deletedNodeKey;
  function nodeClicked(e, obj) {
    deletedNodeKey = obj.part.key
  }

  var deleteBtn = document.getElementById("removepanel");
  deleteBtn.onclick = function () {
    var nodeToDelete = ivrDiagram.selection.iterator.first();
    if (nodeToDelete !== null) {
      ivrDiagram.startTransaction();
      ivrDiagram.remove(nodeToDelete);
      ivrDiagram.commitTransaction("deleted node");

      for (var i in jsonTemplates) {
        if (deletedNodeKey === jsonTemplates[i].id) {
          jsonTemplates.splice(i, 1)
        }
      }
    }
  }

  // Save diagram.model in case adding, deleting or editing graph objects such as nodes or links.
  var saveBtn = document.getElementById("savepanel");
  saveBtn.onclick = function () {
    // When clicked on send diagram.model via service. Also send jsonTemplates here.
    refreshDiagram()
    var modelAsText = ivrDiagram.model.toJson();
    alert("Diagram Model Saved")
  }

  function makeButton(text, action, visiblePredicate) {
    return $("ContextMenuButton",
      $(go.TextBlock, text), {
      click: action
    },
      // Don't bother with binding GraphObject.visible if there's no predicate
      visiblePredicate ? new go.Binding("visible", "", function (o, e) {
        return o.diagram ? visiblePredicate(o, e) : false;
      }).ofObject() : {});
  }

  var nodeMenu = // Context menu for each Node
    $("ContextMenu",
      $(go.Shape, "LineH", {
        strokeWidth: 2,
        height: 1,
        stretch: go.GraphObject.Horizontal
      }),
      makeButton("Add Output Port",
        function (e, obj) {
          addPort("right");
        }),
      makeButton("Copy",
        function (e, obj) {
          e.diagram.commandHandler.copySelection(e.diagram.toolManager.contextMenuTool.mouseDownPoint);
        },
        function (o) {
          return o.diagram.commandHandler.canCopySelection(o.diagram.toolManager.contextMenuTool.mouseDownPoint);
        }),
    );

  ivrDiagram.contextMenu =
    $("ContextMenu",
      makeButton("Paste",
        function (e, obj) {
          e.diagram.commandHandler.pasteSelection(e.diagram.toolManager.contextMenuTool.mouseDownPoint);
        },
        function (o) {
          return o.diagram.commandHandler.canPasteSelection(o.diagram.toolManager.contextMenuTool.mouseDownPoint);
        }),
      makeButton("Undo",
        function (e, obj) {
          e.diagram.commandHandler.undo();
        },
        function (o) {
          return o.diagram.commandHandler.canUndo();
        }),
      makeButton("Redo",
        function (e, obj) {
          e.diagram.commandHandler.redo();
        },
        function (o) {
          return o.diagram.commandHandler.canRedo();
        })
    );

  var portcnt = 0
  function addPort(side) {
    ivrDiagram.startTransaction("addPort");
    ivrDiagram.selection.each(function (node) {
      if (side === "right") {
        var newport =
        {
          portName: " " + portcnt,
          acceptability: false,
        }
        for (var i in jsonTemplates) {
          if (node.data.key === jsonTemplates[i].id) {
            jsonTemplates[i].outputPorts.push(newport)
          }
        }
      }
    });
    ivrDiagram.commitTransaction("addPort");
    redrawDiagram()
    portcnt++
  }

  function redrawDiagram(){
    drawDiagram.PrepareTemplates();
    ivrDiagram.model = go.Model.fromJson(jsonNodes);
  }

  var inspector = new Inspector('ivrInspectorDiv', ivrDiagram,);
  drawDiagram.PrepareTemplates = PrepareTemplates;
  drawDiagram.PrepareTemplates();
  ivrDiagram.model = go.Model.fromJson(jsonNodes);
}
