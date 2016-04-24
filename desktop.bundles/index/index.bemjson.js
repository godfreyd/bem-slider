module.exports = {
    block : 'page',
    title : 'Title of the page',
    favicon : '/favicon.ico',
    head : [
        { elem : 'meta', attrs : { name : 'description', content : '' } },
        { elem : 'meta', attrs : { name : 'viewport', content : 'width=device-width, initial-scale=1' } },
        { elem : 'css', url : 'index.min.css' }
    ],
    scripts: [{ elem : 'js', url : 'index.min.js' }],
    mods : { theme : 'islands' },
    content : [
        {
			block: 'container',
			content: [
				{
					block: 'slider',
					content: [

						{
							elem: 'item',
							content: {
								elem: 'img',
								url: '../../img/1.jpg'
							
							}
						},
						{
							elem: 'item',
							content: {
								elem: 'img',
								url: '../../img/2.jpg'
							}
						},
						{
							elem: 'item',
							content: {
								elem: 'img',
								url: '../../img/3.jpg'
							}
						},
						{
							elem: 'item',
							content: {
								elem: 'img',
								url: '../../img/4.jpg'
							}
						},
						{
							elem: 'item',
							content: {
								elem: 'img',
								url: '../../img/5.jpg'
							}
						}
					]
				}
			]
		}
    ]
};
