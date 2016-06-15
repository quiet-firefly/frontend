import React from 'react';
import DocumentTitle from 'react-document-title';

export default class CreateHunt extends React.Component {
  // getHunts () {
  //   $.ajax({
  //     type: 'GET',
  //     url: '/api/hunts',
  //     datatype: 'jsonp',
  //     success: function(data) {
  //       // this.setState(data);
  //       console.log(data);
  //     }
  //   })
  // };

  onSubmit (e) {

    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/api/hunts',
      data: $('#huntForm').serialize()
    });
  };

  render () {
    return (
      <div className={"row"}>
        <div>
          <h4 className={"blue-text"}> Create a Scavenger Hunt </h4>
        </div>
        <div className={"row"}>
          <form id="huntForm" className={"col m3"} onSubmit={this.onSubmit} method="post">
            <label> Hunt Name
            <input type="text" name="hunt_name" onChange={this.getHunts}/>
            </label>
            <label> Hunt Date
            <input type="date" name="date"/>
            </label>
            <label> Start Time
            <input type="time" name="start_time"/>
            </label>
            <label> End Time
            <input type="time" name="end_time"/>
            </label>
            <label> Location
            <input type="text" name="location"/>
            </label>
            <label> Description
            <input type="text" name="description"/>
            </label>
            <button> Submit </button>
          </form>
        </div>
      </div>
    )
  };
}
