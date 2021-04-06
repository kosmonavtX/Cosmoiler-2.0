
import HomePage from '../pages/home.svelte';
import AboutPage from '../pages/about.svelte';
import FormPage from '../pages/form.svelte';
import CatalogPage from '../pages/catalog.svelte';
import ProductPage from '../pages/product.svelte';

import TelemetryPage from '../pages/telemetry.svelte';
import SettingsPage from '../pages/settings.svelte';
import TripPresetsPage from '../pages/tripPresets.svelte';
import TimerPresetsPage from '../pages/timerPresets.svelte';
import ManualPage from  '../pages/manual.svelte';
import PumpPage from '../pages/pump.svelte';
import SensorPage from '../pages/sensor.svelte';

//import DynamicRoutePage from '../pages/dynamic-route.svelte';
import RequestAndLoad from '../pages/request-and-load.svelte';
import NotFoundPage from '../pages/404.svelte';

var routes = [
  {
    path: '/',
    component: HomePage,
    beforeEnter: function ({resolve, reject}) {
      console.log('exec beforeenter')
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
      path: '/trip-presets/',
      component: TripPresetsPage,
  },
  {
      path: '/timer-presets/',
      component: TimerPresetsPage,
  },
  {
      path: '/manual/',
      component: ManualPage,
  },
  {
      path: '/pump/',
      component: PumpPage
  },
  {
      path: '/sensor/',
      component: SensorPage
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/catalog/',
    component: CatalogPage,
  },
  {
    path: '/product/:id/',
    component: ProductPage,
  },

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
