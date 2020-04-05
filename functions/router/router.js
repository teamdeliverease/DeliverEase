module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.status(200).render('./index.html');
  });
  app.use('/requesters', require('./collections/requesters'));
  app.use('/volunteers', require('./collections/volunteers'));

  app.use('*', function(req, res, next) {
    res.status(404).json({ err: 'Path' + req.originalUrl + ' does not exist' });
  });
};
