package com.school

import android.Manifest
import android.os.Build
import android.os.Bundle
import android.os.Handler

import com.facebook.react.ReactActivity
import android.support.v4.app.ActivityCompat
import android.content.pm.PackageManager
import android.support.v4.content.ContextCompat
import android.widget.Toast


class MainActivity : ReactActivity() {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    override fun getMainComponentName(): String? {
        return "school"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        if (Build.VERSION.SDK_INT >= 23)
            Handler().postDelayed({
                permission()
            }, 1500)
    }

    /**获取权限*/
    fun permission() {
        val checkCallPhonePermission = ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE)
        if (checkCallPhonePermission != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.WRITE_EXTERNAL_STORAGE), 101)
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == 101) {
            if (grantResults[0] != PackageManager.PERMISSION_GRANTED) {//拒绝这个权限
                Toast.makeText(this, "权限授权失败，将无法使用图片上传功能", Toast.LENGTH_LONG).show()
            }
        }
    }

}
