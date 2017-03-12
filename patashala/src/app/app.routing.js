"use strict";
var router_1 = require('@angular/router');
var student_component_1 = require('./components/student.component');
var teacher_component_1 = require('./components/teacher.component');
var appRoutes = [
    {
        path: '',
        component: student_component_1.StudentComponent
    },
    {
        path: 'student',
        component: student_component_1.StudentComponent
    },
    {
        path: 'teacher',
        component: teacher_component_1.TeacherComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map