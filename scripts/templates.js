this.JST=this.JST||{},this.JST.mission_section=function(obj){obj||(obj={});{var __t,__p="",__e=_.escape;Array.prototype.join}with(obj){__p+='<div class="mission_section_outer q1 m_'+__e(id)+'">\n<table class=section_outer><tr>\n  <td class=game-img> <img src="'+__e(img)+'">\n<td style="width: 100%;"><div class=section_inner>\n  <div class="mission_header">'+__e(id)+": "+(null==(__t=name)?"":__t)+' <span class="section_total" id="q_'+__e(id)+'_s"/><span id="q_'+__e(id)+'_err"/></div>\n';for(i in items){__p+='\n  <div class="mission_row">\n ';var this_item="string"==typeof items[i]?{label:items[i],control:'<input type="checkbox" id="<%- task_id %>" reset_value=""/>'}:items[i];__p+="\n    <div class=mission_label>\n      "+(null==(__t=this_item.label)?"":__t)+'\n    </div>\n    <div class=mission_control><span style="display: inline-block; margin-left: 1ex;">\n      '+(null==(__t=_.template(this_item.control)({mission_id:id,task_id:i}))?"":__t)+'\n    </span></div>\n    <div style="clear: both;"/>\n  </div>\n'}__p+="\n</div></td></tr></table></div></tr></table>\n"}return __p},this.JST.saved_score=function(obj){obj||(obj={});var __p="",__e=_.escape;with(obj)__p+='<tr>\n  <td style="text-align: left; padding: 10px;">\n    '+__e(team_name)+'\n  </td>\n  <td style="text-align: right; padding: 10px;">\n    '+__e(score)+"\n  </td>\n</tr>\n";return __p};