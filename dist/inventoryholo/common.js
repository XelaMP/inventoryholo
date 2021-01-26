(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "9uVP":
/*!*********************************!*\
  !*** ./src/app/shared/utils.ts ***!
  \*********************************/
/*! exports provided: Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
class Utils {
    static validatorFields(fields) {
        let field = true;
        fields.forEach((element) => {
            if (!this.validatorField(element)) {
                field = false;
            }
        });
        return field;
    }
    static validatorField(element) {
        return !(element === '' || element === undefined || element === 0);
    }
    static dateToString(date = new Date()) {
        return date.getFullYear() + '-' + Utils.forDate((date.getMonth() + 1)) + '-' + Utils.forDate(date.getDate());
    }
    static dateString(back = 0) {
        const date = new Date();
        let m = date.getMonth() - back;
        let y = date.getFullYear();
        if (m < 0) {
            m = 11 + m;
            y--;
        }
        return y + '-' + Utils.forDate((m + 1)) + '-' + Utils.forDate(date.getDate());
    }
    static forDate(n) {
        let nn = n.toString();
        if (nn.length === 1) {
            nn = '0' + nn;
        }
        return nn;
    }
    static dueDateCompare(dueDateS) {
        const dueDate = new Date(dueDateS);
        const date = new Date();
        const res = dueDate.getTime() - date.getTime();
        return res / (60 * 60 * 24 * 1000);
    }
    static loadScript() {
        $('.topbar .navbar').addClass('navbar-light');
        $('.theme-color .theme-item .theme-link').on('click', function () {
            const sidebarbgskin = $(this).attr('data-sidebarbg');
            $('.left-sidebar').attr('data-sidebarbg', sidebarbgskin);
            $('.scroll-sidebar').attr('data-sidebarbg', sidebarbgskin);
        });
        $('.message-center, .customizer-body, .scrollable, .scroll-sidebar').perfectScrollbar({
            wheelPropagation: !0,
        });
        function setsidebartype() {
            const width = window.innerWidth > 0 ? window.innerWidth : this.screen.width;
            if (width < 1170) {
                $('#main-wrapper').attr('data-sidebartype', 'mini-sidebar');
                $('#main-wrapper').addClass('mini-sidebar');
            }
            else {
                $('#main-wrapper').attr('data-sidebartype', 'full');
                $('#main-wrapper').removeClass('mini-sidebar');
            }
        }
        $(window).ready(setsidebartype);
        $(window).on('resize', setsidebartype);
        const element = $('ul#sidebarnav a activo');
        element.parentsUntil('.sidebar-nav').each(function (index) {
            if ($(this).is('li') && $(this).children('a').length !== 0) {
                $(this).children('a').addClass('active');
                $(this).parent('ul#sidebarnav').length === 0
                    ? $(this).addClass('active')
                    : $(this).addClass('selected');
            }
            else if (!$(this).is('ul') && $(this).children('a').length === 0) {
                $(this).addClass('selected');
            }
            else if ($(this).is('ul')) {
                $(this).addClass('in');
            }
        });
        element.addClass('active');
        $('#sidebarnav a').on('click', function (e) {
            if (!$(this).hasClass('active')) {
                // hide any open menus and remove all other classes
                $('ul', $(this).parents('ul:first')).removeClass('in');
                $('a', $(this).parents('ul:first')).removeClass('active');
                // open our new menu and add the open class
                $(this).next('ul').addClass('in');
                $(this).addClass('active');
            }
            else if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).parents('ul:first').removeClass('active');
                $(this).next('ul').removeClass('in');
            }
        });
        $('#sidebarnav >li >a.has-arrow').on('click', (ev) => {
            ev.preventDefault();
        });
        $('.nav-toggler').on('click', function () {
            $('#main-wrapper').toggleClass('show-sidebar');
            $('.nav-toggler i').toggleClass('ti-menu');
        });
        $('body, .page-wrapper').trigger('resize');
        $('.page-wrapper').delay(20).show();
    }
}
Utils.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
    'Noviembre', 'Diciembre'];
Utils.customNotifierOptions = {
    position: {
        horizontal: {
            position: 'right',
            distance: 12
        },
        vertical: {
            position: 'bottom',
            distance: 12,
            gap: 10
        }
    },
    theme: 'material',
    behaviour: {
        autoHide: 5000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
    },
    animations: {
        enabled: true,
        show: {
            preset: 'slide',
            speed: 300,
            easing: 'ease'
        },
        hide: {
            preset: 'fade',
            speed: 300,
            easing: 'ease',
            offset: 50
        },
        shift: {
            speed: 300,
            easing: 'ease'
        },
        overlap: 150
    }
};


/***/ }),

/***/ "R2Fd":
/*!**********************************!*\
  !*** ./src/app/api/component.ts ***!
  \**********************************/
/*! exports provided: ComponentAbstract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentAbstract", function() { return ComponentAbstract; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");

class ComponentAbstract {
    constructor(service, nts) {
        this.service = service;
        this.nts = nts;
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
        this.getItems();
        this.clean();
    }
    getItems() {
        this.subscription.add(this.service.getItems().subscribe());
    }
    hideModal() {
        $('#form-user').modal('hide');
    }
    addItem(item) {
        return new Promise((resolve, reject) => {
            if (this.idEdit !== '') {
                this.service.updateItem(item).subscribe((res) => {
                    this.hideModal();
                    this.nts.notify('success', 'Actualizando...');
                    this.getItems();
                    resolve('Creado con exito');
                }, error => {
                    this.nts.notify('error', '¡Hubo un error al actualizar!');
                    reject(error);
                });
            }
            else {
                this.service.createItem(item).subscribe((res) => {
                    this.hideModal();
                    const response = JSON.stringify(res);
                    this.nts.notify('success', 'Creando...');
                    this.getItems();
                    resolve('Actualizado con exito');
                }, error => {
                    this.nts.notify('error', '¡Hubo un error al actualizar!');
                    reject(error);
                });
            }
            this.clean();
        });
    }
    deleteItem() {
        this.subscription.add(this.service.deleteItem(this.idDelete).subscribe((res) => {
            const response = JSON.stringify(res);
            this.nts.notify('error', 'Eliminando...');
            this.getItems();
            this.clean();
        }));
    }
    clean() {
        this.idEdit = '';
        this.idDelete = '';
        this.resetItem();
    }
    getKeyForDelete(key) {
        console.log(this.idDelete);
        this.idDelete = key.toString();
    }
}


/***/ })

}]);
//# sourceMappingURL=common.js.map