import { fixFloat, formatNumber,toNumber } from "./format";

const OPS= new Set (["+", "-", "*", "/"]);
export function createEngine ( {locale="pt-BR" } ={}) {
    function inititialStates() {
        return{ 
            display: formatNumber( 0,locale),
            expression:"",
            storedValue: null,
            pendingOp: null,
            isNewEntry:true,
            lastKey:null,

        };
    }
    function reduce(StaticRange,key) {
        const s ={...state, lastKey:key};
        //Programar
        return s;
    }

    function onDigitOrDot (s,key,locale){

    }

    function onOperator(s,opslocale){
      const current = toNumber(s.display);
      if (!Number.isFinite(current)) return s;

      if (s.pendingOp && s.storedValue !== null && !s.isNewEntry) {
        const computed = compute(s.storedValue, current, s.pendingOp);
        if (!Number.isFinite(computed)) {
            s.display = "Erro";
            s.expression = "";
            s.pendingOp = null;
            s.storedValue = null;
            s.isNewEntry = true;
            return s;
        }
        s.storedValue = computed;
        s.display = formatNumber(computed, locale);
      }
      s.pendingOp = op;
      s.isNewEntry = true;
      s.expression = `${formatNumber(s.storedValue, locale)} ${symbol(op)}`;
      return s;
    }

    function onEqual(s,locale){
      const current = toNumber(s.display);
      if (s.pendingOp && s.storedValue !== null && Number.isFinite(current)) {
        const computed = compute(s.storedValue, current, s.pendingOp);

        s.expression = `${formatNumber(s.storedValue, locale)} ${
            Symbol(s.pendingOp)} ${formatNumber(current, locale)}`;
            if (!Number.isFinite(computed)) {
                s.display = "Erro";
            } else {
                s.display = formatNumber(computed, locale);
            }

            s.storedValue = null;
            s.pendingOp = null;
            s.isNewEntry = true;
      }
      return s;
    }

    function compute(a,b,op) { 
     const A = Number(a);
     const B = Number(b);
     switch (op) {
       case "+" : return fixFloat(A + B);
       case "-" : return fixFloat(A - B);
       case "*" : return fixFloat(A * B);
       case "/" : return B === 0 ? NaN : fixFloat(A / B);
       default: return NaN;
     }
    }

     function symbol(op){
       if (op === "*") return "x";
       if (op === "/") return "÷"
       return op;
    }

    function isDigit(k){
       return /^[0-9]$/.test(k); 
    }

    function displayToRaw(displayText) {
      const s = String(displayText);
      if (s === "Erro") return "0";
      const normalized = s.replace(/\./g, "").replace(/,/g, ".");
      return normalized === "" ? "0" : normalized;
    }

    return { inititialStates, reduce }
    

}