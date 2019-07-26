module.exports = async function (context, req) {

    context.log('JavaScript HTTP trigger function processed a request.');
    let urlLinks = [];
    if (req.query.name || (req.body && req.body.name)) {
        const rp = require('request-promise');

        const $ = require('cheerio')

        const URL = 'http://www.google.com/search?start=0&num=20&q=%22US%20navy%22'

       rp(URL)
        .then(function (html) {
            context.log("Requested data received.");
            $('.jfp3ef', html).each((index, value) => {
                var link = $(value).children().attr('href')
                context.log("Link value: " + link);
                if (typeof (link) === 'string') {
                    var it = link.split('/url?q=')[1]
                    urlLinks.push(it)
                }
            })
            context.log("Number of links: " + urlLinks.length);

        }).then(data => {
            console.log("content length = ", urlLinks.length)

            context.res = {
                status: 200, /* Defaults to 200 */
                body: "Hello Bob" + JSON.stringify(urlLinks)
            };
            if (urlLinks.length > 0) {
                // content.forEach((it, index) => {
                //     console.log(index, it)
                // })
                var it = JSON.stringify(urlLinks)
                context.res = {
                    status: 200, /* Defaults to 200 */
                    body: "Hello Bob" + it
                };
                context.bindings.outputblob = it
                context.done()
                // var it = JSON.stringify(urlLinks)
                console.log(it)
                // writer.write(it)

            }
        })
        .catch(function (error) {
            console.log(error)
        }) 
    
    }


    else {
        context.res = {
            status: 400,
            body: "James: Please pass a name on the query string or in the request body"
        };
    }
};
