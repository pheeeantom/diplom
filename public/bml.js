const bmlGenerator = new Blockly.Generator('BML');

bmlGenerator.PRECEDENCE = 0;

/*Blockly.defineBlocksWithJsonArray([{
  "type": "object",
  "message0": "{ %1 %2 }",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "MEMBERS"
    }
  ],
  "output": null,
  "colour": 230,
},
{
  "type": "member",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "MEMBER_NAME",
      "text": ""
    },
    {
      "type": "field_label",
      "name": "COLON",
      "text": ":"
    },
    {
      "type": "input_value",
      "name": "MEMBER_VALUE"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
}]);

var bmlToolbox = `
<xml id="toolbox" style="display: none">
<block type="object"/>
<block type="member"></block>
<block type="math_number"><field name="NUM">0</field></block>
<block type="text"><field name="TEXT"/></block>
<block type="logic_boolean"><field name="BOOL">TRUE</field></block>
<block type="logic_null"/>
<block type="lists_create_with"><mutation items="3"/></block>
</xml>
`;

bmlGenerator['logic_null'] = function(block) {
  return ['null', bmlGenerator.PRECEDENCE];
};

bmlGenerator['text'] = function(block) {
  var textValue = block.getFieldValue('TEXT');
  var code = '"' + textValue + '"';
  return [code, bmlGenerator.PRECEDENCE];
};

bmlGenerator['math_number'] = function(block) {
  const code = Number(block.getFieldValue('NUM'));
  return [code, bmlGenerator.PRECEDENCE];
};

bmlGenerator['logic_boolean'] = function(block) {
  const code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, bmlGenerator.PRECEDENCE];
};

bmlGenerator['member'] = function(block) {
  const name = block.getFieldValue('MEMBER_NAME');
  const value = bmlGenerator.valueToCode(block, 'MEMBER_VALUE',
      bmlGenerator.PRECEDENCE);
  const code = '"' + name + '": ' + value;
  return code;
};

bmlGenerator['lists_create_with'] = function(block) {
  const values = [];
  for (var i = 0; i < block.itemCount_; i++) {
    let valueCode = bmlGenerator.valueToCode(block, 'ADD' + i,
    	bmlGenerator.PRECEDENCE);
    if (valueCode) {
      values.push(valueCode);
    }
  }
  const valueString = values.join(',\n');
  const indentedValueString =
      bmlGenerator.prefixLines(valueString, bmlGenerator.INDENT);
  const codeString = '[\n' + indentedValueString + '\n]';
  return [codeString, bmlGenerator.PRECEDENCE];
};

bmlGenerator['object'] = function(block) {
  const statement_members =
      bmlGenerator.statementToCode(block, 'MEMBERS');
  const code = '{\n' + statement_members + '\n}';
  return [code, bmlGenerator.PRECEDENCE];
};

bmlGenerator.scrub_ = function(block, code, opt_thisOnly) {
  const nextBlock =
      block.nextConnection && block.nextConnection.targetBlock();
  let nextCode = '';
  if (nextBlock) {
      nextCode =
          opt_thisOnly ? '' : ',\n' + bmlGenerator.blockToCode(nextBlock);
  }
  return code +  nextCode;
};*/

const attr_location = [
  "attr_location_allow",
  "attr_location_onsuccess",
  "attr_location_onfail",
  "attr_location_template"
];
const attr_set = [
  "attr_set_id",
  "attr_set_by",
  "attr_set_unique",
  "attr_set_grants",
  "attr_set_groups",
  "attr_set_act",
  "attr_set_get-act",
  "attr_set_post-act",
  "attr_set_patch-act",
  "attr_set_update-act",
  "attr_set_delete-act",
  "attr_set_nest",
  "attr_set_get-nest",
  "attr_set_post-nest",
  "attr_set_patch-nest",
  "attr_set_update-nest",
  "attr_set_delete-nest",
  "attr_set_fetch",
  "attr_set_groupBy",
  "attr_set_aggr",
  "attr_set_listen"
];
const attr_block = [
  "attr_block_id",
  //"attr_block_name",
  "attr_block_type",
  "attr_block_grants",
  "attr_block_where",
  "attr_block_is",
  "attr_block_write",
  "attr_block_path",
  "attr_block_mimes",
  "attr_block_width",
  "attr_block_height",
  "attr_block_resize",
  "attr_block_method",
  "attr_block_ratio",
  "attr_block_comment",
  "attr_block_unpacked_size"
];

const allAttrs = attr_location.concat(attr_set).concat(attr_block);

var attr_generated = [];
var attr_no_string = [0, 9, 15, 21, 26];
for (var i = 0; i < allAttrs.length; i++) {
  if (attr_no_string.includes(i)) {
    continue;
  }

  attr_generated.push({
    "type": allAttrs[i],
    "message0": allAttrs[i].split(/_/)[2] + " of " + allAttrs[i].split(/_/)[1] + " \" %1 \" ----> %2",
    "args0": [
      {
        "type": "field_input",
        "name": allAttrs[i].split(/_/)[2].toUpperCase()
      },
      {
        "type": "input_value",
        "name": "NEXT",
        "check": allAttrs[i].split(/_/)[1] === 'location' ? attr_location : allAttrs[i].split(/_/)[1] === 'set' ? attr_set : attr_block,
      }
    ],
    "colour": "180",
    "output": allAttrs[i].split(/_/)[1] === 'location' ? attr_location : allAttrs[i].split(/_/)[1] === 'set' ? attr_set : attr_block
    //"output": "attr"
  });
}

/*const attr_location_no_string = [0];
var attr_location_generated = [];
for (var i = 0; i < attr_location.length; i++) {
  if (attr_location_no_string.includes(i)) {
    continue;
  }
  attr_location_generated.push({
    "type": attr_location[i],
    "message0": attr_location[i].split(/_/)[2] + " of location \" %1 \"",
    "args0": [
      {
        "type": "field_input",
        "name": attr_location[i].split(/_/)[2].toUpperCase()
      }
    ],
    "previousStatement": attr_location,
    "nextStatement": attr_location
    //"output": "attr"
  });
}

const attr_set_no_string = [5, 11, 17];
var attr_set_generated = [];
for (var i = 0; i < attr_set.length; i++) {
  if (attr_set_no_string.includes(i)) {
    continue;
  }
  attr_set_generated.push({
    "type": attr_set[i],
    "message0": attr_set[i].split(/_/)[2] + " of set \" %1 \"",
    "args0": [
      {
        "type": "field_input",
        "name": attr_set[i].split(/_/)[2].toUpperCase()
      }
    ],
    "previousStatement": attr_set,
    "nextStatement": attr_set
    //"output": "attr"
  });
}*/

var xml = "";
xml += '<category name="location attributes" colour="120">\n';
for (var i = 0; i < attr_location.length; i++) {
  if (i != attr_location.length - 1)
    xml += '<block type="' + attr_location[i] + '"/>\n';
  else 
    xml += '<block type="' + attr_location[i] + '"/>';
}
xml += '\n</category>\n<category name="set attributes" colour="70">\n';
for (var i = 0; i < attr_set.length; i++) {
  if (i != attr_set.length - 1)
    xml += '<block type="' + attr_set[i] + '"/>\n';
  else 
    xml += '<block type="' + attr_set[i] + '"/>';
}
xml += '\n</category>\n<category name="block attributes" colour="200">\n';
for (var i = 0; i < attr_block.length; i++) {
  if (i != attr_block.length - 1)
    xml += '<block type="' + attr_block[i] + '"/>\n';
  else 
    xml += '<block type="' + attr_block[i] + '"/>';
}

const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([/*{
  "type": "block",
  "message0": "block",
  "message1": "name \" %1 \"",
  "args1": [
    {
      "type": "field_input",
      "name": "NAME"
    }
  ],
  "message2": "attrs %1 inside %2",
  "args2": [
    {
      "type": "input_statement",
      "name": "ATTRS",
      "check": "attr"
    },
    {
      "type": "input_statement",
      "name": "DO",
      "check": ["block","set"]
    }
  ],
  //"output": "block",
  "nextStatement": ["set","block"],
  "previousStatement": ["set", "block"],
  "colour": 50
},*/
{
  "type": "model",
  "message0": "model",
  "message1": "%1",
  "args1": [
    {"type": "input_statement", "name": "DO", "check": "set_in_model"}
  ],
  "nextStatement": "location",
  //"output": "model",
  "colour": 100
},
{
  "type": "location",
  "message0": "location",
  "message1": "base \" %1 \"",
  "args1": [
    {"type": "field_input", "name": "BASE"}
  ],
  "message2": "attrs %1",
  "args2": [
    {"type": "input_value", "name": "ATTRS", "check": attr_location}
  ],
  "message3": "%1",
  "args3": [
    {"type": "input_statement", "name": "DO", "check": "set_in_location"}
  ],
  "nextStatement": "location",
  "previousStatement": ["location","model"],
  //"output": "location",
  "colour": 150
},
/*{
  "type": "group",
  "message0": "group",
  "message1": "%1",
  "args1": [
    {"type": "input_statement", "name": "DO", "check": ["block","set"]}
  ],
  "output": "group",
  "colour": 150
},
{
  "type": "attrs",
  "message0": "attrs",
  "message1": "%1",
  "args1": [
    {"type": "input_statement", "name": "ATTRS", "check": "attr"}
  ],
  //"previousStatement": "attrs",
  //"nextStatement": "attrs",
  "output": "attrs",
  "colour": 100
},*/
{
  "type": "attr_location_allow",
  "message0": "allow of location %1 ----> %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "ALLOW",
      "options": [
        [ "GET", "GET"],
        [ "POST", "POST"],
        [ "PATCH", "PATCH"],
        [ "CREATE", "CREATE"],
        [ "UPDATE", "UPDATE"],
        [ "DELETE", "DELETE"]
      ]
    },
    {
      "type": "input_value",
      "name": "NEXT",
      "check": attr_location
    }
  ],
  "colour": "180",
  "output": attr_location
  //"output": "attr"
},
/*{
  "type": "attr_location_onsuccess",
  "message0": "onsuccess of location \" %1 \"",
  "args0": [
    {
      "type": "field_input",
      "name": "ONSUCCESS"
    }
  ],
  "previousStatement": attr_location,
  "nextStatement": attr_location
  //"output": "attr"
},
{
  "type": "attr_location_onfail",
  "message0": "onfail of location \" %1 \"",
  "args0": [
    {
      "type": "field_input",
      "name": "ONFAIL"
    }
  ],
  "previousStatement": attr_location,
  "nextStatement": attr_location
  //"output": "attr"
},
{
  "type": "attr_location_template",
  "message0": "template of location \" %1 \"",
  "args0": [
    {
      "type": "field_input",
      "name": "TEMPLATE"
    }
  ],
  "previousStatement": attr_location,
  "nextStatement": attr_location
  //"output": "attr"
},*/
/*{
  "type": "attr_set_id",
  "message0": "id of set \" %1 \"",
  "args0": [
    {
      "type": "field_input",
      "name": "ID"
    }
  ],
  "previousStatement": attr_set,
  "nextStatement": attr_set
  //"output": "attr"
},
{
  "type": "attr_set_by",
  "message0": "by of set \" %1 \"",
  "args0": [
    {
      "type": "field_input",
      "name": "BY"
    }
  ],
  "previousStatement": attr_set,
  "nextStatement": attr_set
  //"output": "attr"
},
{
  "type": "attr_set_unique",
  "message0": "unique of set \" %1 \"",
  "args0": [
    {
      "type": "field_input",
      "name": "UNIQUE"
    }
  ],
  "previousStatement": attr_set,
  "nextStatement": attr_set
  //"output": "attr"
},
{
  "type": "attr_set_grants",
  "message0": "grants of set \" %1 \"",
  "args0": [
    {
      "type": "field_input",
      "name": "GRANTS"
    }
  ],
  "previousStatement": attr_set,
  "nextStatement": attr_set
  //"output": "attr"
},*/
{
  "type": "attr_set_act",
  "message0": "act of set %1 ----> %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "ACT",
      "options": [
        [ "read", "read"],
        [ "create", "create"],
        [ "update", "update"],
        [ "delete", "delete"]
      ]
    },
    {
      "type": "input_value",
      "name": "NEXT",
      "check": attr_set
    }
  ],
  "colour": "180",
  "output": attr_set
  //"output": "attr"
},
{
  "type": "attr_set_nest",
  "message0": "nest of set %1 ----> %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "NEST",
      "options": [
        [ "inherit", "inherit"],
        [ "trim", "trim"],
        [ "attach", "attach"]
      ]
    },
    {
      "type": "input_value",
      "name": "NEXT",
      "check": attr_set
    }
  ],
  "colour": "180",
  "output": attr_set
  //"output": "attr"
},
{
  "type": "attr_set_fetch",
  "message0": "fetch of set %1 ----> %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "FETCH",
      "options": [
        [ "none", "none"],
        [ "aggr", "aggr"],
        [ "single", "single"],
        [ "array", "array"],
        [ "map", "map"]
      ]
    },
    {
      "type": "input_value",
      "name": "NEXT",
      "check": attr_set
    }
  ],
  "colour": "180",
  "output": attr_set
  //"output": "attr"
},
{
  "type": "attr_block_type",
  "message0": "type of block %1 ----> %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "TYPE",
      "options": [
        [ "string", "string"],
        [ "number", "number"],
        [ "file", "file"],
        [ "image", "image"],
        [ "archive", "archive"]
      ]
    },
    {
      "type": "input_value",
      "name": "NEXT",
      "check": attr_block
    }
  ],
  "colour": "180",
  "output": attr_block
  //"output": "attr"
},
...attr_generated,
{
  "type": "set_model_first",
  "message0": "set level 1",
  "message1": "name \" %1 \"",
  "args1": [
    {
      "type": "field_input",
      "name": "NAME"
    }
  ],
  "message2": "attrs %1 ----> %2",
  "args2": [
    {
      "type": "input_value",
      "name": "ATTRS",
      "check": attr_set
    },
    {
      "type": "input_statement",
      "name": "DO",
      "check": ["set_model_second_in_first"]
    }
  ],
  //"output": "set",
  "nextStatement": ["set_model_first"],
  "previousStatement": ["set_model_first","set_in_model"],
  "colour": 300
},
{
  "type": "set_model_second",
  "message0": "set level 2",
  "message1": "name \" %1 \"",
  "args1": [
    {
      "type": "field_input",
      "name": "NAME"
    }
  ],
  "message2": "attrs %1",
  "args2": [
    {
      "type": "input_value",
      "name": "ATTRS",
      "check": attr_set
    }
  ],
  //"output": "set",
  "nextStatement": ["block_model"],
  "previousStatement": ["set_model_second_in_first"],
  "colour": 300
},
{
  "type": "set_location",
  "message0": "set location",
  "message1": "name \" %1 \"",
  "args1": [
    {
      "type": "field_input",
      "name": "NAME"
    }
  ],
  "message2": "attrs %1 ----> %2",
  "args2": [
    {
      "type": "input_value",
      "name": "ATTRS",
      "check": attr_set
    },
    {
      "type": "input_statement",
      "name": "DO",
      "check": ["block_location","set_location"]
    }
  ],
  //"output": "set",
  "nextStatement": ["set_in_location","block_location"],
  "previousStatement": ["set_in_location","block_location","set_in_location"],
  "colour": 300
},
{
  "type": "block_model",
  "message0": "block model",
  "message1": "name \" %1 \"",
  "args1": [
    {
      "type": "field_input",
      "name": "NAME"
    }
  ],
  "message2": "attrs %1",
  "args2": [
    {
      "type": "input_value",
      "name": "ATTRS",
      "check": attr_block
    }
  ],
  //"output": "block",
  "nextStatement": ["block_model"],
  "previousStatement": ["set_model_second", "block_model"],
  "colour": 50
},
{
  "type": "block_location",
  "message0": "block location",
  "message1": "name \" %1 \"",
  "args1": [
    {
      "type": "field_input",
      "name": "NAME"
    }
  ],
  "message2": "attrs %1",
  "args2": [
    {
      "type": "input_value",
      "name": "ATTRS",
      "check": attr_block
    }
  ],
  "nextStatement": ["block_location","set_location"],
  "previousStatement": ["block_location","set_location"],
  "colour": 50
}
/*,
{
  "type": "text",
  "message0": "\" %1 \"",
  "args0": [
    {
      "type": "field_input",
      "name": "TEXT"
    }
  ],
  "output": "text"
}*/]);

/*{
  "type": "block",
  "message0": "block with attrs %1 with inside %2",
  "args0": [
    {
      "type": "input_value",
      "name": "ATTRS",
      "check": "attrs"
    },
    {
      "type": "input_value",
      "name": "VALUE",
      "check": ["block", "set"]
    }
  ],
  //"output": "block",
  "nextStatement": ["set","block"],
  "previousStatement": ["set", "block"],
  "colour": 50
},*/

/*blocks['block_location'] = {
  init: function() {
    this.jsonInit({
      "type": "block_location",
      "message0": "block location",
      "message1": "name \" %1 \"",
      "args1": [
        {
          "type": "field_input",
          "name": "NAME"
        }
      ],
      "message2": "attrs %1",
      "args2": [
        {
          "type": "input_value",
          "name": "ATTRS",
          "check": attr_block
        }
        /*{
          "type": "input_statement",
          "name": "DO",
          "check": ["block_location","set_location"]
        }*/
      /*],
      //"output": "block",
      "nextStatement": ["block_location","set_location"],
      "previousStatement": ["block_location","set_location"],
      "colour": 50
    });
  }/*,
  onchange: function(e) {
    if (event.type == Blockly.Events.BLOCK_DRAG) {

    }
    let rc = Blockly.RenderedConnection(this, 3)
    let child = this;
    let root = rc.closestConnection_.targetBlock();
    if (root != null) {
      while (root.getInputTargetBlock("DO") != child) {
        child = child.getParent();
        root = child.getParent();
      }
      if (root.type === "model" || root.type === "location") {
        rc.unhighlight();
      }
    }
    /*let child = this;
    let root = child.getParent();
    if (root != null)
      console.log(root.type);*/
    /*if (root != null) {
      while (root.getInputTargetBlock("DO") != child) {
        child = child.getParent();
        root = child.getParent();
      }
      if (root.type === "model" || root.type === "location") {
        this.previousConnection.targetConnection.unplug();
        this.unplug();
      }
    }*/
  //}
//};

Blockly.common.defineBlocks(blocks);

var bmlToolbox = `
<xml id="toolbox" style="display: none">
<category name="blocks" colour="10">
<block type="model"/>
<block type="location"/>
<block type="set_model_first"/>
<block type="set_model_second"/>
<block type="set_location"/>
<block type="block_model"/>
<block type="block_location"/>
</category>
` + xml + `
</category>
</xml>
`;
