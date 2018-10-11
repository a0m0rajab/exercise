function range(start , end , step=1){
    let b = start ;
    let s = end;
    // let m = step || 1;
    a=[] 
    if (start < end){
        b=end;s=start;
    }
    if (step < 0)
        {
            for(var i = b;i >=s  ; i+=step){
                a.push(i)
            }
            return a;
        }
    for(var i = s;i <= b ; i+=step){
        a.push(i)
    }
    return a; 
}

function sum(ar){
    sum =0
    for(var i=0 ; i < ar.length; i++)
        sum+=ar[i]
    return sum;
}   