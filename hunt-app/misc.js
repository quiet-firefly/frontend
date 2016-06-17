var Form = require('react-formal')
  , yup = require('yup')

// if we are using a different set of inputs
// we can set some defaults once at the beginning
Form.addInputTypes(
  require('react-formal-inputs'))

var defaultStr = yup.string().default('')

var modelSchema = yup.object({

    name: yup.object({
      first: defaultStr.required('please enter a first name'),
      last:  defaultStr.required('please enter a surname'),
    }),

    dateOfBirth: yup.date()
      .max(new Date(), "You can't be born in the future!"),

    colorId: yup.number().nullable()
      .required('Please select a color')
  });

var form = (
  <Form
    schema={modelSchema}
    defaultValue={modelSchema.default()}
  >
    <div>
      <label>Name</label>

      <Form.Field name='name.first' placeholder='First name'/>
      <Form.Field name='name.last' placeholder='Surname'/>

      <Form.Message for={['name.first', 'name.last']}/>
    </div>

    <label>Date of Birth</label>
    <Form.Field name='dateOfBirth'/>
    <Form.Message for='dateOfBirth'/>

    <label>Favorite Color</label>
    <Form.Field name='colorId' type='select'>
      <option value={null}>Select a color...</option>
      <option value={0}>Red</option>
      <option value={1}>Yellow</option>
      <option value={2}>Blue</option>
      <option value={3}>other</option>
    </Form.Field>
    <Form.Message for='colorId'/>

  <Form.Button type='submit'>Submit</Form.Button>
</Form>)

React.render(form, mountNode);
