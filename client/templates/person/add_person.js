Template.addPerson.created = function() {
	Session.set('postSubmitErrors', {});
}

Template.addPerson.helpers({
	errorMessage: function(field) {
		return Session.get('addPersonErrors')[field];
	},
	errorClass: function (field) {
		return !!Session.get('addPersonErrors')[field] ? 'has-error' : '';
	}
});

Template.addPerson.events({
	'submit form': function(e) {
		e.preventDefault();

		var person = {
			first_name: $(e.target).find('[name=first_name]').val(),
			middle_name: $(e.target).find('[name=middle_name]').val(),
			last_name: $(e.target).find('[name=last_name]').val(),
			gender: $(e.target).find('[name=gender]:checked').val(),
			bdate: $(e.target).find('[name=bdate]').val(),
			pdate: $(e.target).find('[name=pdate]').val(),
			marital_status: $(e.target).find('[name=status]:checked').val(),
			religion: $(e.target).find('[name=religion]').val(),

			category: $(e.target).find('[name=category]:checked').val(),
			bank_name: $(e.target).find('[name=bank_name]').val(),
			account: parseInt($(e.target).find('[name=account]').val()),
			baddress: $(e.target).find('[name=baddress]').val(), 
			land_number: parseInt($(e.target).find('[name=Land_number]').val()),
			pmobile_number: parseInt($(e.target).find('[name=pmobile_number]').val()),
			email: $(e.target).find('[name=email]').val(),
			address: $(e.target).find('[name=address]').val(),
			father_name: $(e.target).find('[name=father_name]').val(),
			father_status: $(e.target).find('[name=father_status]:checked').val(),
			father_work: $(e.target).find('[name=father_work]').val(),
			mother_name: $(e.target).find('[name=mother_name]').val(),
			mother_status: $(e.target).find('[name=mother_status]:checked').val(),
			mother_work: $(e.target).find('[name=mother_work]').val(),
			siblings_name: $(e.target).find('[name=siblings_name]').val()
		
		}

		var errors = validatePerson(person);
		if (errors.first_name)
			return Session.set('addPersonErrors', errors);


		Meteor.call('personInsert', person, function(error, result){
			if(error)
				return throwError(error.reason);

			if (result.personExists)
				throwError('This email id has already been used');

			Router.go('personPage', {_id: result._id});
		});
	}
});
