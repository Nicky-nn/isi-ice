import{I as p}from"./imask-JlAOpWDu.js";import{a as o}from"./react-C-yax-zd.js";import{P as e}from"./prop-types-tGFuYKac.js";const u={mask:e.oneOfType([e.array,e.func,e.string,e.instanceOf(RegExp),e.oneOf([Date,Number,p.Masked]),e.instanceOf(p.Masked)]),value:e.any,unmask:e.oneOfType([e.bool,e.oneOf(["typed"])]),prepare:e.func,prepareChar:e.func,validate:e.func,commit:e.func,overwrite:e.oneOfType([e.bool,e.oneOf(["shift"])]),eager:e.oneOfType([e.bool,e.oneOf(["append","remove"])]),skipInvalid:e.bool,onAccept:e.func,onComplete:e.func,placeholderChar:e.string,displayChar:e.string,lazy:e.bool,definitions:e.object,blocks:e.object,enum:e.arrayOf(e.string),maxLength:e.number,from:e.number,to:e.number,pattern:e.string,format:e.func,parse:e.func,autofix:e.oneOfType([e.bool,e.oneOf(["pad"])]),radix:e.string,thousandsSeparator:e.string,mapToRadix:e.arrayOf(e.string),scale:e.number,normalizeZeros:e.bool,padFractionalZeros:e.bool,min:e.oneOfType([e.number,e.instanceOf(Date)]),max:e.oneOfType([e.number,e.instanceOf(Date)]),dispatch:e.func,inputRef:e.oneOfType([e.func,e.shape({current:e.object})])},m=Object.keys(u).filter(n=>n!=="value"),c=["value","unmask","onAccept","onComplete","inputRef"],h=m.filter(n=>c.indexOf(n)<0);function k(n){var i;const r=(i=class extends o.Component{constructor(t){super(t),this._inputRef=this._inputRef.bind(this)}componentDidMount(){this.props.mask&&this.initMask()}componentDidUpdate(){const t=this.props,s=this._extractMaskOptionsFromProps(t);if(s.mask)this.maskRef?(this.maskRef.updateOptions(s),"value"in t&&t.value!==void 0&&(this.maskValue=t.value)):this.initMask(s);else if(this.destroyMask(),"value"in t&&t.value!==void 0){var a;(a=this.element)!=null&&a.isContentEditable&&this.element.tagName!=="INPUT"&&this.element.tagName!=="TEXTAREA"?this.element.textContent=t.value:this.element.value=t.value}}componentWillUnmount(){this.destroyMask()}_inputRef(t){this.element=t,this.props.inputRef&&(Object.prototype.hasOwnProperty.call(this.props.inputRef,"current")?this.props.inputRef.current=t:this.props.inputRef(t))}initMask(t){t===void 0&&(t=this._extractMaskOptionsFromProps(this.props)),this.maskRef=p(this.element,t).on("accept",this._onAccept.bind(this)).on("complete",this._onComplete.bind(this)),"value"in this.props&&this.props.value!==void 0&&(this.maskValue=this.props.value)}destroyMask(){this.maskRef&&(this.maskRef.destroy(),delete this.maskRef)}_extractMaskOptionsFromProps(t){const{...s}=t;return Object.keys(s).filter(a=>h.indexOf(a)<0).forEach(a=>{delete s[a]}),s}_extractNonMaskProps(t){const{...s}=t;return m.forEach(a=>{a!=="maxLength"&&delete s[a]}),"defaultValue"in s||(s.defaultValue=t.mask?"":s.value),delete s.value,s}get maskValue(){return this.maskRef?this.props.unmask==="typed"?this.maskRef.typedValue:this.props.unmask?this.maskRef.unmaskedValue:this.maskRef.value:""}set maskValue(t){this.maskRef&&(t=t==null&&this.props.unmask!=="typed"?"":t,this.props.unmask==="typed"?this.maskRef.typedValue=t:this.props.unmask?this.maskRef.unmaskedValue=t:this.maskRef.value=t)}_onAccept(t){this.props.onAccept&&this.maskRef&&this.props.onAccept(this.maskValue,this.maskRef,t)}_onComplete(t){this.props.onComplete&&this.maskRef&&this.props.onComplete(this.maskValue,this.maskRef,t)}render(){return o.createElement(n,{...this._extractNonMaskProps(this.props),inputRef:this._inputRef})}},i.displayName=void 0,i.propTypes=void 0,i),l=n.displayName||n.name||"Component";return r.displayName="IMask("+l+")",r.propTypes=u,o.forwardRef((f,t)=>o.createElement(r,{...f,ref:t}))}const d=k(n=>{let{inputRef:i,...r}=n;return o.createElement("input",{...r,ref:i})}),R=(n,i)=>o.createElement(d,{...n,ref:i}),v=o.forwardRef(R);export{v as I};
