package com.example.imrenagi.uberhack_android;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.webkit.WebView;

import com.uber.sdk.core.auth.Scope;
import com.uber.sdk.rides.auth.OAuth2Credentials;
import com.uber.sdk.rides.client.SessionConfiguration;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;

public class Main3Activity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main3);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        
        SessionConfiguration config = new SessionConfiguration.Builder()
                .setClientId("IfJAn2d5NTWIRBhbqjPMmqdF1NIPEhcD")
                .setClientSecret("y5CUnmvDwYyHQl9FyPtJcBSXktUmhG3GOvIoDRos")
                .setEnvironment(SessionConfiguration.Environment.SANDBOX)
                .setScopes(Arrays.asList(Scope.PROFILE, Scope.REQUEST))
                .setRedirectUri("https://uberadss.herokuapp.com/api/success")
                .build();

        OAuth2Credentials credentials = new OAuth2Credentials.Builder()
                .setSessionConfiguration(config)
                .build();

        try {
            String authorizationUrl = credentials.getAuthorizationUrl();
            System.out.println(authorizationUrl);

            WebView webView = (WebView) findViewById(R.id.webview);
            webView.loadUrl(authorizationUrl);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

}
