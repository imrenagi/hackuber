package com.example.imrenagi.uberhack_android;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;


import com.uber.sdk.core.auth.Scope;
import com.uber.sdk.rides.auth.OAuth2Credentials;
import com.uber.sdk.rides.client.CredentialsSession;
import com.uber.sdk.rides.client.ServerTokenSession;
import com.uber.sdk.rides.client.SessionConfiguration;
import com.uber.sdk.rides.client.UberRidesApi;
import com.uber.sdk.rides.client.model.UserProfile;
import com.uber.sdk.rides.client.services.RidesService;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;

import retrofit2.Response;

public class OAuthActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_oauth);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });


        // Create an Uber session with a server token
//        SessionConfiguration config = new SessionConfiguration.Builder()
//                .setClientId("YOUR_CLIENT_ID")
//                .setServerToken("YOUR_SERVER_TOKEN")
//                .build();
//
//        ServerTokenSession session = new ServerTokenSession(config);

        //  Authorize a user for your application
        SessionConfiguration config = new SessionConfiguration.Builder()
                .setClientId("1rXyVoUDsOSBXyLt0AgtChZSAQNLmrMc")
                .setClientSecret("ziSGOVn2GeKhBxAny0F7LlPR6h4LHH2woYUHY9fo")
                .setEnvironment(SessionConfiguration.Environment.SANDBOX)
                .setScopes(Arrays.asList(Scope.PROFILE, Scope.REQUEST))
                .setRedirectUri("rebuads://UberAuthorizationCode")
                .build();

        OAuth2Credentials credentials = new OAuth2Credentials.Builder()
                .setSessionConfiguration(config)
                .build();

//        try {
//            String authorizationUrl = credentials.getAuthorizationUrl();
//        } catch (UnsupportedEncodingException e) {
//            e.printStackTrace();
//        }
//
//        String userId;
//        String authorizationCode;
//
//        Credential credential = credentials.authenticate(authorizationCode, userId);
//        CredentialsSession session = new CredentialsSession(config, credential);
//        RidesService service = UberRidesApi.with(session).createService();
//
//        try {
//            Response<UserProfile> response = service.getUserProfile().execute();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
    }

}
