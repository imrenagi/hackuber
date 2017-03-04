package com.example.imrenagi.uberhack_android;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.imrenagi.uberhack_android.model.Ads;
import com.squareup.picasso.Picasso;

import java.util.List;

/**
 * Created by imrenagi on 3/4/17.
 */

public class AdsItemAdapter extends BaseAdapter {

    private Context mContext;
    private LayoutInflater mInflater;
    private List<Ads> items;

    public AdsItemAdapter(Context context, List<Ads> adsElement) {
        mContext = context;
        items = adsElement;
        mInflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    }

    @Override
    public int getCount() {
        return items.size();
    }

    @Override
    public Object getItem(int position) {
        return items.get(position);
    }

    @Override
    public long getItemId(int position) {
        return items.get(position).getId();
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // Get view for row item
        View rowView = mInflater.inflate(R.layout.ads_layout, parent, false);

        ImageView imageView = (ImageView) rowView.findViewById(R.id.image);
        TextView title = (TextView) rowView.findViewById(R.id.title);
        TextView description = (TextView) rowView.findViewById(R.id.description);

        Ads ads = items.get(position);

        title.setText(ads.getTitle());
        description.setText(ads.getDescription());
        Picasso.with(mContext).load(ads.getImage()).placeholder(R.mipmap.ic_launcher).into(imageView);

        return rowView;

    }
}
