// Main pages
import HomePage from '../pages/home.svelte';
import TelemetryPage from '../pages/telemetry.svelte';
import SettingsPage from '../pages/settings.svelte';
import ServicePage from '../pages/service.svelte';
// Settings pages
import TripPresetsPage from '../pages/settings/tripPresets.svelte';
import TimerPresetsPage from '../pages/settings/timerPresets.svelte';
import ManualPage from  '../pages/settings/manual.svelte';
import PumpPage from '../pages/settings/pump.svelte';
import SensorPage from '../pages/settings/sensor.svelte';
// Service pages
import WifiPage from '../pages/service/wifi.svelte';
import SystemPage from '../pages/service/system.svelte';
import UpdatePage from '../pages/service/update.svelte';
import AboutPage from '../pages/service/about.svelte';
import DiagPage from '../pages/service/diag.svelte';
//import DynamicRoutePage from '../pages/dynamic-route.svelte';
import RequestAndLoad from '../pages/request-and-load.svelte';
import NotFoundPage from '../pages/404.svelte';

var routes = [
  {
    path: '/',
    component: HomePage,
    beforeEnter: function ({resolve, reject}) {
      //console.log('exec beforeenter')
    }
  },
  {
    path: '/telemetry/',
    component: TelemetryPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },
  {
    path: '/service/',
    component: ServicePage,
  },
  {
    path: '/settings/odometer/presets',// '/trip-presets/',
    component: TripPresetsPage,
  },
  {
    path: '/settings/odometer/sensor/',
    component: SensorPage
  },
  {
    path: '/settings/timer/presets',// '/timer-presets/',
    component: TimerPresetsPage,
  },
  {
      path: '/settings/manual/',
      component: ManualPage,
  },
  {
      path: '/settings/pump/',
      component: PumpPage
  },
  {
    path: '/service/wifi',
    component: WifiPage,
  },
  {
    path: '/service/system',
    component: SystemPage,
  },
  {
    path: '/service/update',
    component: UpdatePage,
  },
  {
    path: '/service/diag',
    component: DiagPage,
  },
  {
    path: '/service/about',
    component: AboutPage,
  },
/*   {
    path: '/product/:id/',
    component: ProductPage,
  }, */

/*   {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  }, */
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
