# What is this?

This is a means of testing what problems a given browser will have trying to load
mixed content.

We use [Content Security Policy](http://www.html5rocks.com/en/tutorials/security/content-security-policy/)
to get the browser to report the mixed content errors back to an endpoint nominated by us,
so that we can view these errors and determine what the problems are from one browser to the next.

We use https://report-uri.io to act as our enpoint for capturing the mixed content errors,
though we can also report them back directly to this application and see them in the console.

    # If we're using our application to capture the reports, set the following in config.json
    reportURI = 'https://csp.ngrok.com/csp-report';

    # If we're using report-uri.io to capture the reports, set the following in config.json
    reportURI = 'https://report-uri.io/report/cspngrokcom/reportOnly';


## Installation

Install our dependencies:

    npm install

Visit https://report-uri.io and setup a new token:

Add the token to `config.json`:

    reportURI = 'https://report-uri.io/report/cspngrokcom/reportOnly';

Download [ngrok](https://ngrok.com/) and extract the zip file to the local directory.

Note that I'm using ngrok version 1.7, and because I've previously donated to the project,
we can set subdomains because we have the following auth token in `./ngrok`.

Ngrok have since moved to a pricing model which includes custom subdomains for $5 per month
(https://ngrok.com/product#pricing)


## Usage

Start our server:

    node index.js

In another console tab, expose our site at https://csp.ngrok.com:

    ./ngrok -subdomain=csp 9000

Visit our site:

    https://csp.ngrok.com/healthcheck

View the active mixed content page in a browser, and look for errors in the dev tools

    https://csp.ngrok.com/active

If using ngrok, view the reports in the console.

If using report-uri.io, view the reports on report-uri.io

    https://report-uri.io/account/csp_real_time/
    https://report-uri.io/account/csp_reports/

## Essential Reading

* http://www.html5rocks.com/en/tutorials/security/content-security-policy/

* https://www.tollmanz.com/content-security-policy-report-samples/

* https://blog.twitter.com/2011/improving-browser-security-with-csp
