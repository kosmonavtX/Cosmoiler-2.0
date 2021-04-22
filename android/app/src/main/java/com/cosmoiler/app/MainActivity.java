package com.cosmoiler.app;

import android.app.ActionBar;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import android.view.View;
import android.view.WindowManager;
import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

//    View decorView = getWindow().getDecorView();
//// Hide the status bar.
//    int uiOptions = View.SYSTEM_UI_FLAG_FULLSCREEN;
//    decorView.setSystemUiVisibility(uiOptions);
// Remember that you should never show the action bar if the
// status bar is hidden, so hide that too if necessary.
//    ActionBar actionBar = getActionBar();
//    actionBar.show();

//    if (Build.VERSION.SDK_INT < 16) {
//      getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
//    }
//    else {
//      View decorView = getWindow().getDecorView();
//      // Show Status Bar.
//      int uiOptions = View.SYSTEM_UI_FLAG_VISIBLE;
//      decorView.setSystemUiVisibility(uiOptions);
//    ActionBar actionBar = getActionBar();
//    actionBar.show();
 //   }
//    getWindow().setFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN,
//            WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
    }});
  }
}
