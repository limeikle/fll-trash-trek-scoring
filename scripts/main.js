function add_one_to_dropdown(a,b){var c=$("#"+a);if(c.val(parseInt(c.val())+1),b){var c=$("#"+b);c.val(parseInt(c.val())-1)}calculate()}function inc_button(a,b){return'<button class="inc_button" onclick="add_one_to_dropdown(\''+a+"', '"+(b?b:"")+"')\">+</button>"}var col=$("#mission_column_1");add_mission(col,{id:"M01",name:"Recycling",img:"./img/fll2015/recycling.jpg",tasks:["Yellows Bin in other team's Safety?","Blues Bin in other team's Safety?","Other team's Yellows Bin in Safety?","Other team's Blues Bin in Safety?"],score:function(a,b){yes(a[0])&&"other_team"!=val("q_M04a_1")?b("M04 mismatch"):yes(a[1])&&"other_team"!=val("q_M04a_3")&&b("M04 mismatch");for(var c=0,d=0;5>=d;d++)c+=val(a[d]);return c!=num_blacks&&console.log("Total of "+c+" non-penalty blacks; expected "+num_blacks),60*(yes(a[0])+yes(a[1])+yes(a[2])+yes(a[3]))}}),add_mission(col,{id:"M02",name:"Methane",img:"./img/fll2015/methane.png",tasks:["In the Truck's Engine Compartment","In the Factory's Power Station"],score:function(a){return 40*(yes(a[0])+yes(a[1]))}}),add_mission(col,{id:"M03",name:"Transport",img:"./img/fll2015/transport.png",tasks:["Yellow Bin entirely supported by Truck","Yellow Bin completely east of Truck Guide"],score:function(a){return 50*yes(a[0])+60*yes(a[1])}});var num_blues=6,num_yellows=9;add_mission(col,{id:"M04a",name:"Sorting - Yellows and Blues",img:"./img/fll2015/sorting-yellows-and-blues.png",tasks:[{label:"Yellows in Yellows Bin",control:inc_button("q_M04a_0")+dropdown(_.range(num_yellows+1))},{label:"Yellows Bin location",control:dropdown({origin:"never in West Transfer",west:"at West Transfer",other_team:"at other team's Safety",misplaced:"misplaced after Transfer"},"origin")},{label:"Blues in Blues Bin",control:inc_button("q_M04a_2")+dropdown(_.range(num_blues+1))},{label:"Blues Bin location",control:dropdown({origin:"never in West Transfer",west:"at West Transfer",other_team:"at other team's Safety",misplaced:"misplaced after Transfer"},"origin")}],score:function(a){var b="origin"==val(a[1])?6:"west"==val(a[1])?7:0,c="origin"==val(a[3])?6:"west"==val(a[3])?7:0;return b*val(a[0])+c*val(a[2])}});var num_blacks=12;add_mission(col,{id:"M04b",name:"Sorting - Blacks",img:"./img/fll2015/sorting-blacks.png",tasks:[{label:"Blacks in Setup position",control:dropdown(_.range(num_blacks+1),num_blacks)},{label:"Blacks in Sorter Blacks Bin",control:inc_button("q_M04b_1","q_M04b_0")+dropdown(_.range(num_blacks+1))},{label:"Blacks in Landfill Bin",control:inc_button("q_M04b_2","q_M04b_0")+dropdown(_.range(num_blacks+1))},{label:"Blacks used in Flower Box",control:inc_button("q_M04b_3","q_M04b_0")+dropdown(_.range(3))},{label:"Non-penalty Blacks elsewhere",control:inc_button("q_M04b_4","q_M04b_0")+dropdown(_.range(num_blacks+1))},{label:"<i>Penalties</i>",control:inc_button("q_M04b_5","q_M04b_0")+dropdown(_.range(5))}],score:function(a,b){for(var c=0,d=0;5>=d;d++)c+=val(a[d]);return c!=num_blacks&&(b("miscount"),console.log("Total of "+c+" non-penalty blacks; expected "+num_blacks)),8*(val(a[0])+val(a[3]))+3*(val(a[1])+val(a[2]))-8*(val(a[4])+val(a[5]))},count_mission:function(a){return val(a[1])+val(a[2])+val(a[3])>0}}),add_mission(col,{id:"M05",name:"Careers",img:"./img/fll2015/careers.png",tasks:["Person in Sorting Area"],score:function(a){return 60*yes(a[0])}}),col=$("#mission_column_2"),add_mission(col,{id:"M06",name:"Scrap Cars",img:"./img/fll2015/scrap-car.png",tasks:["Engine/Windshield installed","Folded in East Transfer"],score:function(a){return yes(a[0])&&yes(a[1])?0/0:65*yes(a[0])+50*yes(a[1])}}),add_mission(col,{id:"M07",name:"Cleanup",img:"./img/fll2015/cleanup.png",tasks:[{label:"Plastic Bags in Safety",control:inc_button("q_M07_0")+dropdown([0,1,2])},{label:"Animals completely in cleared circles",control:inc_button("q_M07_1")+dropdown([0,1,2,3])},"Chicken in small circle"],score:function(a){return 30*val(a[0])+20*val(a[1])+35*yes(a[2])}}),add_mission(col,{id:"M08",name:"Composting",img:"./img/fll2015/composting.png",tasks:["Compost ejected","Compost in Safety"],score:function(a){return yes(a[1])?80:60*yes(a[0])}}),add_mission(col,{id:"M09",name:"Salvage",img:"./img/fll2015/salvage.png",tasks:["Valuables in Safety"],score:function(a){return 60*yes(a[0])}}),add_mission(col,{id:"M10",name:"Demolition",img:"./img/fll2015/demolition.png",tasks:["Building completely demolished"],score:function(a){return 85*yes(a[0])}}),add_mission(col,{id:"M11",name:"Purchasing",img:"./img/fll2015/purchasing.png",tasks:[{label:"Toy Planes in Safety",control:inc_button("q_M11_0")+dropdown([0,1,2])}],score:function(a){return 40*val(a[0])}}),add_mission(col,{id:"M12",name:"Repurposing",img:"./img/fll2015/repurposing.png",tasks:["Compost in Toy Plane packaging"],score:function(a){return 40*yes(a[0])}});