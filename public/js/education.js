// work and experience
$(document).ready(function () {
    const maxField = 5; // We can add 5 field maximum
    const addworkButton = $('.add-work-button');
    const workWrapper = $('.work-wrapper');

    var workHTML = `<div class="form-work-elements">
        <div class="form-group">
            <label for="company">Company</label>
            <input required type="text" class="form-control" placeholder="Company Name" name="company[]">
        </div>
        <div class="form-group">
            <label for="work_description">Work Description</label>
            <input required type="text" class="form-control" placeholder="Work Description" name="work_description[]">
        </div>
        <div class="form-group">
            <label for="work_start">Work Start</label>
            <input required type="date" class="form-control" placeholder="Work Start"
                name="work_start[]">
            <label for="work_end">Work End</label>
            <input type="date" class="form-control" placeholder="Work End"
                name="work_end[]">
        </div>
        <div class="form-group">
            <a href="javascript:void(0);" class="remove-work-button" title="Add field">Remove</a>
        </div>
    </div>`;

    let x = 1;
    $(addworkButton).click(function () {
        if (x < maxField) {
            x++;
            $(workWrapper).append(workHTML);
        }
    });
    $(workWrapper).on('click', '.remove-work-button', function (e) {
        e.preventDefault();
        $(this).parent().closest(".form-work-elements").remove();
        x--;
    });
});


// education
$(document).ready(function () {
    const maxField = 5; // We can add 5 field maximum
    const addeduButton = $('.add-edu-button');
    const eduWrapper = $('.edu-wrapper');

    const eduHTML = `<div class="form-edu-elements">
        <div class="form-group">
            <label for="university">University</label>
            <input required type="text" class="form-control" placeholder="University Name"
                name="university[]">
        </div>
        <div class="form-group">
            <label for="">Degree</label>
            <select required name="degree[]" class="form-control">
                <option value="">--Select Degree--</option>
                <option value="highschool">High School</option>
                <option value="btech">BTech</option>
                <option value="mtech">MTech</option>
                <option value="phd">Phd</option>
            </select>
        </div>
        <div class="form-group">
            <label for="percentage">Percentage</label>
            <input required type="number" max="100.00" step=".01" class="form-control" placeholder="Percentage"
                name="percentage[]">
        </div>
        <div class="form-group">
                    <label for="degree_start">Degree Start</label>
                    <input required type="date" class="form-control" placeholder="Degree Start" name="degree_start[]">
                    <label for="degree_end">Degree End</label>
                    <input required type="date" class="form-control" placeholder="Degree End" name="degree_end[]">
                </div>
        <div class="form-group">
            <a href="javascript:void(0);" class="remove-edu-button" title="Add field">Remove</a>
        </div>
    </div>`;

    let x = 1;
    $(addeduButton).click(function () {
        if (x < maxField) {
            x++;
            $(eduWrapper).append(eduHTML);
        }
    });
    $(eduWrapper).on('click', '.remove-edu-button', function (e) {
        e.preventDefault();
        $(this).parent().closest(".form-edu-elements").remove();
        x--;
    });
});

// $('reset-btn').click(function() {
//     location.reload();
// });

// function reset_edu(){    
//     // document.getElementById("work-form").reset();
//     window.location.reload();
// }
