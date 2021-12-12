// project
$(document).ready(function () {
    const maxField = 7; // We can add 7 field maximum
    const addprojectButton = $('.add-project-button');
    const projectWrapper = $('.project-wrapper');

    var projectHTML = `<div class="form-project-elements">
        <div class="form-group">
            <label for="project">Project</label>
            <input required type="text" class="form-control" placeholder="Project Link" name="project[]">
        </div>
        <div class="form-group">
            <a href="javascript:void(0);" class="remove-project-button" title="Add field">Remove</a>
        </div>
    </div>`;

    let x = 1;
    $(addprojectButton).click(function () {
        if (x < maxField) {
            x++;
            $(projectWrapper).append(projectHTML);
        }
    });
    $(projectWrapper).on('click', '.remove-project-button', function (e) {
        e.preventDefault();
        $(this).parent().closest(".form-project-elements").remove();
        x--;
    });
});