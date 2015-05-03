package com.xulu.cordova.myEcho;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
//import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import android.util.Log;

/**
 * This class echoes a string called from JavaScript.
 */
public class Echo extends CordovaPlugin {
    private static final String TAG = "Echo";
    /*@Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
         
        super.initialize(cordova, webView);
        Context context = this.cordova.getActivity().getApplicationContext();
         
    }*/

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("echo")) {
            Log.v(TAG, "echo: this is a test------>");
            String message = args.getString(0);
            cordova.getThreadPool().execute(new Runnable(){
                public void run(){
                     this.echo(message, callbackContext);
                }
            });
            //this.echo(message, callbackContext);
            return true;
        }
        return false;
    }

    private void echo(String message, CallbackContext callbackContext) {
        Log.v(TAG, "Toast: initialization");
        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
}