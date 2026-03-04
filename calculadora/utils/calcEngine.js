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
        
    }

}