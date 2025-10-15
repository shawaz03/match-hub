// Supabase migration: Model definition will be handled in Supabase dashboard
        required: true
    }

});

module.exports = mongoose.model('Event', eventSchema);