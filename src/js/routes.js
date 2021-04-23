// Main pages
import HomePage from '../pages/home.svelte';
import TelemetryPage from '../pages/telemetry.svelte';
import SettingsPage from '../pages/settings.svelte';
import MorePage from '../pages/more.svelte';
// Settings pages
import TripPresetsPage from '../pages/settings/tripPresets.svelte';
import TimerPresetsPage from '../pages/settings/timerPresets.svelte';
import ManualPage from  '../pages/settings/manual.svelte';
import PumpPage from '../pages/settings/pump.svelte';
import SensorPage from '../pages/settings/sensor.svelte';
// More pages
import WifiPage from '../pages/more/wifi.svelte';
import SystemPage from '../pages/more/system.svelte';
import UpdatePage from '../pages/more/update.svelte';
import AboutPage from '../pages/more/about.svelte';
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
    path: '/more/',
    component: MorePage,
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
    path: '/more/wifi',
    component: WifiPage,
  },
  {
    path: '/more/system',
    component: SystemPage,
  },
  {
    path: '/more/update',
    component: UpdatePage,
  },
  {
    path: '/more/about',
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
