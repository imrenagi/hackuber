//
//  ViewController.swift
//  uberads
//
//  Created by 吳隆筠 on 3/3/17.
//  Copyright © 2017 Cyrus Goh. All rights reserved.
//

import UIKit
import UberRides

@IBOutlet weak var logoutButtonBgView: UIView!

var uberScopes: [RidesScope]?
var uberLoginManager: LoginManager?
var uberLoginButton: LoginButton?

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

