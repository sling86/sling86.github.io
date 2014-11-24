        $('#one').waypoint(function(direction) {
            console.log('#one 5% from the top and going '+ direction);
            if(direction==='down')
            {
                $('a[href="#one"]').click();
            }
        }, { offset: '5%' });
        $('#two').waypoint(function(direction) {
            console.log('#two 5% from the top and going '+ direction);
            if(direction==='down')
            {
                $('a[href="#two"]').click();
            }
        }, { offset: '5%' });
        $('#three').waypoint(function(direction) {
            console.log('#three 5% from the top and going '+ direction);
            if(direction==='down'){
                $('a[href="#three"]').click();
            }
        }, { offset: '5%' });
        $('#gallery').waypoint(function(direction) {
            console.log('#gallery 5% from the top and going '+ direction);
            if(direction==='down'){
                $('a[href="#gallery"]').click();
            }
        }, { offset: '5%' });


function scrollTM(anchor) {
    e.preventDefault();
    $('a[href="#'+anchor+'"]').click();
    setTimeout(return, 3000);
}
    