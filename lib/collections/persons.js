Persons = new Mongo.Collection('persons');

Meteor.methods({
	personInsert: function(personAttributes){
		check(Meteor.userId(), String);
		check(personAttributes,{
			first_name: String,
			middle_name: String,
			last_name: String,
			gender: String,			
			bdate: String,
			pdate: String,
			marital_status: String,
			religion: String,
			
			category: String,
			bank_name: String,
			account: Number,
			baddress: String,
			
			land_number: Number,	
			pmobile_number: Number,
			email: String,
			address: String,
		
			father_name: String,
			father_status: String,
			father_work: String,
			mother_name: String,
			mother_status: String,
			mother_work: String,
			siblings_name: String			
		});

		validatePerson = function (person) {
			var errors = {};
			if (!person.first_name)
				errors.first_name = "Please fill in a Name";
			return errors;
		}

		var personWithSameEmail = Persons.findOne({email: personAttributes.email});
		if (personWithSameEmail) {
			return {
				personExists: true,
				_id: personWithSameEmail._id
			}
		}

		var user = Meteor.user();
		
		var person = _.extend(personAttributes, {});
	
		var personId = Persons.insert(person);
		
		return {
			_id: personId
		};

	}

});
