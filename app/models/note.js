var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
   title: String,
   body: String,
   created_at: { type: Date, default: Date.now },
   updated_at: { type: Date, default: Date.now },
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   }
});

//index para facilitar a consulta

noteSchema.index({ 'title': 'text', 'body': 'text' })

module.exports = mongoose.model('Note', noteSchema);