import {NotifierOptions} from 'angular-notifier';

declare var $: any;

export class Utils {
  static months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
    'Noviembre', 'Diciembre'];

  static customNotifierOptions: NotifierOptions = {
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
  static validatorFields(fields: any[]): boolean {
    let field = true;
    fields.forEach((element) => {
      if (!this.validatorField(element)) {
        field = false;
      }
    });
    return field;
  }
  static validatorField(element: any): boolean {
    return !(element === '' || element === undefined || element === 0);
  }

  static dateToString(date = new Date()): string {
    return date.getFullYear() + '-' + Utils.forDate((date.getMonth() + 1)) + '-' + Utils.forDate(date.getDate());
  }

  static dateString(back: number = 0): string {
    const date = new Date();
    let m = date.getMonth() - back;
    let y = date.getFullYear();
    if (m < 0) {
      m = 11 + m;
      y--;
    }
    return y + '-' + Utils.forDate((m + 1)) + '-' + Utils.forDate(date.getDate());
  }

  static forDate(n: number): string {
    let nn = n.toString();
    if (nn.length === 1) {
      nn = '0' + nn;
    }
    return nn;
  }


  static loadScript(): void {
    $('.topbar .navbar').addClass('navbar-light');

    $('.theme-color .theme-item .theme-link').on('click', function(): void {
      const sidebarbgskin = $(this).attr('data-sidebarbg');
      $('.left-sidebar').attr('data-sidebarbg', sidebarbgskin);
      $('.scroll-sidebar').attr('data-sidebarbg', sidebarbgskin);
    });


    $(
      '.message-center, .customizer-body, .scrollable, .scroll-sidebar'
    ).perfectScrollbar({
      wheelPropagation: !0,
    });

    function setsidebartype(): void {
      const width =
        window.innerWidth > 0 ? window.innerWidth : this.screen.width;
      if (width < 1170) {
        $('#main-wrapper').attr('data-sidebartype', 'mini-sidebar');
        $('#main-wrapper').addClass('mini-sidebar');
      } else {
        $('#main-wrapper').attr('data-sidebartype', 'full');
        $('#main-wrapper').removeClass('mini-sidebar');
      }
    }

    $(window).ready(setsidebartype);
    $(window).on('resize', setsidebartype);

    const element = $('ul#sidebarnav a activo');
    element.parentsUntil('.sidebar-nav').each(function(index): void {
      if ($(this).is('li') && $(this).children('a').length !== 0) {
        $(this).children('a').addClass('active');
        $(this).parent('ul#sidebarnav').length === 0
          ? $(this).addClass('active')
          : $(this).addClass('selected');
      } else if (!$(this).is('ul') && $(this).children('a').length === 0) {
        $(this).addClass('selected');
      } else if ($(this).is('ul')) {
        $(this).addClass('in');
      }
    });

    element.addClass('active');
    $('#sidebarnav a').on('click', function(e): void{
      if (!$(this).hasClass('active')) {
        // hide any open menus and remove all other classes
        $('ul', $(this).parents('ul:first')).removeClass('in');
        $('a', $(this).parents('ul:first')).removeClass('active');

        // open our new menu and add the open class
        $(this).next('ul').addClass('in');
        $(this).addClass('active');
      } else if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).parents('ul:first').removeClass('active');
        $(this).next('ul').removeClass('in');
      }
    });
    $('#sidebarnav >li >a.has-arrow').on('click', (ev) => {
      ev.preventDefault();
    });

    $('.nav-toggler').on('click', function(): void {
      $('#main-wrapper').toggleClass('show-sidebar');
      $('.nav-toggler i').toggleClass('ti-menu');
    });

    $('body, .page-wrapper').trigger('resize');
    $('.page-wrapper').delay(20).show();

  }
}
