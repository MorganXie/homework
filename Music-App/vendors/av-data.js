var APP_ID = 'MTtc1w5rvxtBQtszNzzGxaBi-gzGzoHsz'
var APP_KEY = 'X3lLWjfgi4fJxMNhhYoR4Ewc'

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

$(function(){
    !function(){
        var query = new AV.Query('Indexlist')
        query.find().then(function (results) {
            
            $('.lastest-list > #loading').remove()
            $('.hot-content > #loading').remove()
            var html = ''
            var html1 = ''
            var html2 = ''
            var num = 0
            for(var i=0;i<results.length;i++){
                if(results[i].attributes.hot === 'index'){
                    html += '<a href="./play.html?id=' + results[i].id +'" class="music-list border"><div class="music-list-cont">\
                    <h3>'+ results[i].attributes.name +'<small>'+ results[i].attributes.nameinfo +'</small></h3>\
                    <p class="textoverflow"><svg class="icon icon-sq"><use xlink:href="#icon-sq"></use></svg>'+ 
                    results[i].attributes.singer + ' - ' + results[i].attributes.name 
                    +'</p></div><span><svg class="icon icon-play"><use xlink:href="#icon-play"></use></svg></span></a>'
                    }
                
                
                if(results[i].attributes.hot === 'hot'){
                    num++
                    num = num > 9 ? num : '0' + num
                    html1 += '<a href="./play?id='+ results[i].id +'" class="hot-item">\
                    <div class="hot-item-num">'+ num +'</div>\
                        <div class="hot-item-content border">\
                            <div class="hot-item-context">\
                                <h3>'+ results[i].attributes.name +'<span>'+ results[i].attributes.nameinfo +'</span></h3>\
                                <p class="textoverflow"><svg class="icon icon-sq"><use xlink:href="#icon-sq"></use></svg>'+
                                results[i].attributes.singer + ' - ' + results[i].attributes.name +'</p>\
                            </div>\
                            <div class="hot-item-play">\
                                <svg class="icon icon-play"><use xlink:href="#icon-play"></use></svg>\
                            </div></div></a>'   
                }
            }
            $('.lastest-list').append(html)
            $('.hot-content').append(html1)

            $('.latest-list a').on('click',function(){
                $.get('./play.html?id='+results[i].id).done(function(response){
                    //console.log(response)
                })
            })
            
        }, function (error) {
            alert('获取歌曲失败')
        })

        
    }()

    !function(){
        var query = new AV.Query('Recommendlist')
        query.find().then(function (results) {
            $('#loading').remove()
            var html = ''
            for(var i=0;i<results.length;i++){
                html += '<a href="./playlist.html?id='+ (i+1) +'">\
                            <div class="recommend-img">\
                                <img src='+ results[i].attributes.imgUrl +' alt="">\
                                <span class="earphone">'+ results[i].attributes.playnum +'万</span>\
                            </div>\
                            <p>'+ results[i].attributes.info +'</p></a>'
            }
            
            $('.recommend-songs').append(html)
        }, function (error) {
            alert('获取推荐失败')
        })
    }()

    !function(){
        var timer = null
        $('#search').on('input',function(e){
            var value = $(e.currentTarget).val().trim()
            
            $('.search-box').addClass('active')
            if($(e.currentTarget).val() === ''){
                
                $('.search-box').removeClass('active')

                $('.search-results').empty()
                $('.search-list').show()
            } 
            if(value === ''){return}

            var queryName = new AV.Query('Indexlist')
            queryName.contains('name',value)
            var querySinger = new AV.Query('Indexlist')
            querySinger.contains('singer',value)
            
            var query = AV.Query.or(queryName,querySinger)


            if(timer){clearTimeout(timer)}
            timer = setTimeout(function(){
                timer = null
                
                query.find().then(function (results) {
                    $('.search-list').hide()
                    $('.search-results').empty()
                    var html = ''
                    if(results.length === 0){
                        
                        html = '<h3 class="border">搜索"'+ value +'"</h3><div>\
                        <a class="results-item" href=>暂无搜索结果</a></div>'
                        
                    }else{
                        for(var i=0;i<results.length;i++){
                            html += '<a class="results-item" href="./play.html?id='+ results[i].id +'">\
                                    <i class="results-icon">\
                                    <svg class="icon icon-search"><use xlink:href="#icon-search"></use></svg>\
                                    </i>\
                                    <span class="border textoverflow">'+ results[i].attributes.name + ' - ' +
                                results[i].attributes.singer +'</span></a>'
                        }
                        html = '<h3 class="border">搜索"'+ value +'"</h3><div>' + html + '</div>'
                        
                    }
                    $('.search-results').append(html)
                }, function (error) {
                    
                })
            },500)
            
            
            
        })
    }()
    
    !function(){
        $('.search-list > ul').on('click','li',function(e){
            e.preventDefault()
            $('.search-list').hide()
            $('.search-box').addClass('active')  
            $('#search').val($(this).text())
            $('.search-results').empty()
            var value = $(this).text()

            var queryName = new AV.Query('Indexlist')
            queryName.contains('name',value)
            var querySinger = new AV.Query('Indexlist')
            querySinger.contains('singer',value)
            
            var query = AV.Query.or(queryName,querySinger)
            
            query.find().then(function (results) {
                var html = ''
                if(results.length === 0){
                    
                    html = '<h3 class="border">搜索"'+ value +'"</h3><div>\
                    <a class="results-item" href=>暂无搜索结果</a></div>'
                   
                }else{
                    for(var i=0;i<results.length;i++){
                        html += '<a class="results-item" href="./play.html?id='+ results[i].id +'">\
                                <i class="results-icon">\
                                <svg class="icon icon-search"><use xlink:href="#icon-search"></use></svg>\
                                </i>\
                                <span class="border textoverflow">'+ results[i].attributes.name + ' - ' +
                            results[i].attributes.singer +'</span></a>'
                    }
                    html = '<h3 class="border">搜索"'+ value +'"</h3><div>' + html + '</div>'
                    
                }
                $('.search-results').append(html)
               
            })
        })
    }()

    
})







