<template>
    <div>
        <button @mouseover = "isHidden = false" @mouseout = "isHidden = true">
            {{title}}
            <span class = "downBtn"></span>
            <div class = "dropdown-box" :class = "{hidden:isHidden}">
                <ul>
                    <li v-for = "item in items" @click = "onclick(item.text)">{{item.text}}</li>
                </ul>
            </div>
        </button>
    </div>
</template>
<script>
export default {
	name : "v3dropdown",
	props : {
        itemSource: {
            type: Array,
            default: function() {
                return [];
            }
        },
        itemValue: {
            type: String,
            default: "id"
        },
        itemText: {
            type: String,
            default: "text"
        },
        onClick : Function,
        title : String
	},
	data : function(){
		return {
			isHidden:true,
			items: []
		};
	},
	watch : {
        itemSource: {
			handler: function(nVal, oVal) {
				this.updateItems();
			},
			deep: true
        }
    },
    created : function(){
        this.updateItems();
    },
	methods : {
		onclick : function(item){
			this.$emit('on-click',item);
		},
		updateItems: function() {
            var items = [];
            for (var i = 0, l = this.itemSource.length; i < l; i++) {
                var val = this.itemSource[i];
                var _value = val[this.itemValue];
                var _text = val[this.itemText];
                var _checked = val[this.itemChecked]
                items.push({
                    value: _value,
                    text: _text
                });
            }
            this.items = items;
        }
	}
}
</script>
<style scoped lang="less" src="./theme.less"></style>