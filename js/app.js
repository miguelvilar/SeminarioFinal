App = Ember.Application.create({});

var posts = [{
  id: '1',
  title: "La Luna",
  author: { name: "Miguel" },
  date: new Date('6-27-2013'),
  date2: new Date('0-0-0000'),
  imageUrl: "http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg",
  excerpt: "Desde la misión del Apolo 17 en 1972, ha sido visitada únicamente por sondas espaciales no tripuladas, en particular por los astromóviles soviéticos Lunojod.",
  body: "La Luna es el único satélite natural de la Tierra. Con un diámetro de 3476 km es el quinto satélite más grande del Sistema Solar, mientras que en cuanto al tamaño proporcional respecto de su planeta es el satélite más grande: un cuarto del diámetro de la Tierra y 1/81 de su masa. Después de Ío, es además el segundo satélite más denso."
}, {
  id: '2',
  title: "Mi mundo",
  author: { name: "Miguel" },
  date: new Date('5-24-2013'),
  date2: new Date('0-0-0000'),
  imageUrl: "http://www.nasa.gov/images/content/711375main_grail20121205_4x3_946-710.jpg",
  excerpt: "Sobre [La Tierra](http://es.wikipedia.org/wiki/Tierra) esta toda esta informacion.",
  body: "La Tierra (de Terra, nombre latino de Gea, deidad griega de la feminidad y la fecundidad) es un planeta del Sistema Solar que gira alrededor de su estrella en la tercera órbita más interna. Es el más denso y el quinto mayor de los ocho planetas del Sistema Solar. También es el mayor de los cuatro terrestres."  
}, {
	  id: '3',
  title: "Estrella",
  author: { name: "Miguel" },
  date: new Date('1-31-2013'),
  date2: new Date('0-0-0000'),
  imageUrl: "http://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Pleiades_large.jpg/800px-Pleiades_large.jpg",
  excerpt: "Estas esferas de gas emiten tres formas de energía hacia el espacio, la radiación electromagnética, los neutrinos y el viento estelar y esto es lo que nos permite observar la apariencia de las estrellas en el cielo nocturno como puntos luminosos y, en la gran mayoría de los casos, titilantes.",
  body: "En sentido general, una estrella es todo objeto astronómico que brilla con luz propia; mientras que en términos más técnicos y precisos podría decirse que se trata de una esfera de plasma que mantiene su forma gracias a un equilibrio hidrostático de fuerzas. El equilibrio se produce esencialmente entre la fuerza de gravedad, que empuja la materia hacia el centro de la estrella, y la presión que ejerce el plasma hacia fuera, que, tal como sucede en un gas, tiende a expandirlo."
	}];

App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return posts;
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return posts.findBy('id', params.post_id);
  }
});

App.PostController = Ember.ObjectController.extend({
  isEditing: false,

  edit: function() {
    this.set('isEditing', true);
  },

  doneEditing: function() {
    this.set('isEditing', false);
    this.get('store').commit();
  }
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});
