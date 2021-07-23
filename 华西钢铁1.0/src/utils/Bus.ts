export default class Bus {
    
    list:{[key:string] : Array<Function>}
    constructor(){
        this.list ={}
    }

    $on(name:string,fn:Function){
        this.list[name] = this.list[name]||[]
        this.list[name].push(fn)
        console.log(name,fn);
        
    }
    $emit(name:string,data?:any){
        if(this.list[name]){
            this.list[name].forEach((fn:Function)=>{
                fn(data)
            })
        }
        console.log(name,'emeit');

    }
    $off(name: string) {
		if (this.list[name]) {
			delete this.list[name];
		}
	}
}