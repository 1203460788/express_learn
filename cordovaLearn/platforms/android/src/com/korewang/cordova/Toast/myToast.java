package com.korewang.cordova.Toast;
 
 
 
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
 
import android.content.Context;
import android.telephony.TelephonyManager;
import android.util.Log;
 
public class myToast extends CordovaPlugin {  
    private static final String TAG = "Toast";
     @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
         
        super.initialize(cordova, webView);
        Log.v(TAG, "Toast: initialization");
        Context context = this.cordova.getActivity().getApplicationContext();
         
    }
    @Override  
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {  
        if("show".equals(action)){  
            show(args.getString(0), args.getInt(1));  
        }/*else if("openVideo".equals(action)) {
            openVideo(args.getString(0));
        }*/
     
        callbackContext.success();  
        return true;  
    }//
    private void show(String text,int type){  
        CordovaInterface cordova = this.cordova;  
         
        if(type==1){  
             Log.e("e11111111111111111", "Crop operation not supported on this device");
            android.widget.Toast.makeText(cordova.getActivity(), text, 1).show();  
        }else{  
            android.widget.Toast.makeText(cordova.getActivity(), text, 0).show();  
        }  
    }  
    /*private void openVideo(String text){
        String url = text;
        String extension = MimeTypeMap.getFileExtensionFromUrl(url);  
        String mimeType = MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);  
        Intent mediaIntent = new Intent(Intent.ACTION_VIEW);  
        mediaIntent.setDataAndType(Uri.parse(url), mimeType);  
        //startActivity(mediaIntent); 
        cordova.startActivityForResult((CordovaPlugin) this, mediaIntent, 200);
    }*/
    
}